from flask import Flask, request
from flask_cors import CORS
import pandas
import json

app = Flask(__name__)
CORS(app)

#assign constants to json and csv file
FILEPATH = 'top10.csv'

@app.route('/score-update',methods=['POST'])
def score_update():
    """This is used to update the scoreboard file with a new score. 
    front end calls the function and the score (JSON format) is ran against
    the dataframe that is pulled from the Excel spreadsheet and udpated with the new
    numbers, lowest score is deleted from the table if the table is now over 10 players"""
    
    #open score and playername from frontend and convert to pandas dataframe
    data = json.loads(request.data)
    print(data)
    new_row = pandas.DataFrame([data])
    print(new_row)
    placemark = int(new_row['Score'])
    print(placemark)
    scoreboard = pandas.read_csv(FILEPATH)
    print(scoreboard)

    #sorting incoming JSON score into appropriate row depending on score 
    for index,row in scoreboard.iterrows():
        if placemark > row['Score']:
            scoreboard = pandas.concat([scoreboard.iloc[:index], new_row, scoreboard.iloc[index:]]).reset_index(drop=True)            
            break

    #ensure that only 10 players are in the top 10 leaderboard
    if len(scoreboard)>10:
        scoreboard = scoreboard.drop(scoreboard.index[-1])

    scoreboard.to_csv(FILEPATH,index=False)#write updated scoreboard to the Excel spreadsheet
    
    return {'201': 'score created successfully'}

@app.route('/get_score',methods=['GET'])
def get_score():
    """This function is used to get the scoreboard to display on the JS leaderboard page"""
    scoreboard = pandas.read_csv(FILEPATH)
    scoreboard = scoreboard.to_json(orient='records')#convert spreadsheet to JSON for frontend

    return scoreboard

if __name__ == '__main__':
    app.run()

#internal function for clearing the entire leaderboard
def clear_table():
    scoreboard = pandas.read_csv(FILEPATH)#read recent 
    scoreboard.drop(scoreboard.index,inplace=True)
    scoreboard.to_csv(FILEPATH,index=False)   

# #input to delete scoreboard
# admin = input("Type 'delete' to delete Leaderboard (Case-Sensitive): ")
# #only terminates once delete is typed into the terminal
# while admin.lower() != 'delete':
#     admin = input("Type 'delete' to delete Leaderboard (Case-Sensitive): ")

# clear_table()
# print("Leaderboard Deleted.")