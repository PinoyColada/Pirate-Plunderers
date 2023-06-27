from flask import Flask
import pandas
import json

app = Flask(__name__)

#assign constants to json and csv file
FILEPATH = 'top10.csv'
NEW_SCORE = 'scoreC.json'

@app.route('/score-update',methods=['POST'])
def score_update():
    """This is used to update the scoreboard file with a new score. 
    front end calls the function and the score (JSON format) is ran against
    the dataframe that is pulled from the Excel spreadsheet and udpated with the new
    numbers, lowest score is deleted from the table if the table is now over 10 players"""
    with open(NEW_SCORE) as f:
        data = json.load(f)
        new_row = pandas.DataFrame([data])

    placemark = int(new_row['Score'])
    scoreboard = pandas.read_csv(FILEPATH)

    for index,row in scoreboard.iterrows():
        if placemark > row['Score']:
            scoreboard = pandas.concat([scoreboard.iloc[:index], new_row, scoreboard.iloc[index:]]).reset_index(drop=True)            
            break

    if len(scoreboard)>10:
        scoreboard = scoreboard.drop(scoreboard.index[-1])

    scoreboard.to_csv(FILEPATH,index=False)   
    
    return scoreboard

@app.route('/get_score',methods=['POST'])
def get_score():
    """This function is used to get the scoreboard to display on the JS leaderboard page"""
    scoreboard = pandas.read_csv(FILEPATH)
    scoreboard = scoreboard.to_json(orient='records')

    return scoreboard

if __name__ == '_main__':
    app.run()

#internal function for clearing the entire leaderboard
def clear_table():
    scoreboard = pandas.read_csv(FILEPATH)
    scoreboard.drop(scoreboard.index,inplace=True)
    scoreboard.to_csv(FILEPATH,index=False)   
    
clear_table()