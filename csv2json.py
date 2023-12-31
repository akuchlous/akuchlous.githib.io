import csv
import json

def convert_csv_to_json(csv_file_path):
    # Create an empty list to store the JSON data
    json_data = []

    # Read data from the CSV file
    with open(csv_file_path, 'r') as csvfile:
        csv_reader = csv.reader(csvfile)
        
        # Skip the header row
        next(csv_reader, None)

        # Iterate through rows
        for row in csv_reader:
            # Find or create the section in the JSON data
            section = find_or_create_section(json_data, row[:3])

            # Add the subsection data to the section
            section['subsections'].append({
                'index': row[3],
                'question': row[4],
                'min_words': row[5],
                'question_details': row[6],
                'ideal_answer': row[7],
                'grading': row[8],
                'request': row[9]
            })

    # Convert the JSON data to a string
    json_string = json.dumps(json_data, indent=2)

    # Print the JSON string
    print(json_string)

# Helper function to find or create a section in the JSON data
def find_or_create_section(json_data, labels):
    for section in json_data:
        if section['label'] == labels[0]:
            return section
    
    # If the section doesn't exist, create a new one
    new_section = {
        'label': labels[0],
        'title': labels[1],
        'description': labels[2],
        'subsection': []
    }
    
    json_data.append(new_section)
    return new_section

# Specify the path to your CSV file
csv_file_path = 'questions.csv'

# Call the conversion function
convert_csv_to_json(csv_file_path)
