import requests

url = 'http://192.168.100.13:5000/mood'
files = {'image': open("./songs/uploaded_image.jpg", 'rb')}
response = requests.post(url, files=files)
print(response.content)