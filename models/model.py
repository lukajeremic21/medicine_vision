from flask import Flask, request
from flask_cors import CORS
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow as tf
from keras import layers
from keras.models import Sequential
from keras.preprocessing import image
import numpy as np

app = Flask(__name__)
CORS(app)


loaded_model = tf.keras.models.load_model('./brain_scans/brain_tumor_2_model_v2')

class_names = [
        'Astrocitoma T1', 'Astrocitoma T1C+', 'Astrocitoma T2', 'Ependimoma T1C+',
        'Ependimoma T2', 'Ganglioglioma T1', 'Ganglioglioma T1C+',
        'Ganglioglioma T2', 'Germinoma T2', 'Meduloblastoma T2', 'Meningioma T1',
        'Meningioma T1C+', 'Meningioma T2', 'Neurocitoma T1', 'Neurocitoma T1C+',
        'Neurocitoma T2', 'Papiloma T1', 'Papiloma T1C+', 'Papiloma T2',
        'Schwannoma T1', 'Schwannoma T1C+', 'Schwannoma T2', '_NORMAL T1',
        '_NORMAL T2'
    ]


blood_cells_model = tf.keras.models.load_model('./blood_cells/model.h5')
class_labels = ['Benign', '[Malignant] Pre-B', '[Malignant] Pro-B', '[Malignant] early Pre-B']  # Add your class labels here


@app.route('/blood_cells', methods=['GET','POST'])
def blood_cells_prediction():

    file = request.files['image']
    filename = file.filename
    file.save(f'./blood_cells/blood_cells_images/{filename}')

    img_path = './blood_cells/blood_cells_images/'+filename
    img = image.load_img(img_path, target_size=(224, 224))  # Resize the image to match the input shape of the model


    # Convert the image to a NumPy array
    image_array = image.img_to_array(img)

    # Expand dimensions to create a batch of size 1 (if the model expects a batch dimension)
    image_array = tf.expand_dims(image_array, 0)

    # Normalize the pixel values to be between 0 and 1
    image_array /= 255.0

    # Assuming you have already loaded and preprocessed the image and stored it in 'image_array'
    predictions = blood_cells_model.predict(image_array)

    # Get the index of the predicted class (the class with the highest probability)
    predicted_class_index = tf.argmax(predictions[0])

    # You can optionally get the class labels or names from your dataset to map the index to the actual class name
    # Replace 'class_labels' with your list of class labels

    predicted_class_name = class_labels[predicted_class_index]

    # Print or return the predicted class name
    print("Predicted class:", predicted_class_name)
    # result = f'{predicted_class_name} sa sigurnošću od {confidence:.2f}%. '
    result = f'{predicted_class_name}. '

    return result

@app.route('/brain_prediction', methods=['GET','POST'])
def brain_prediction(): 
    file = request.files['image']
    print(file)
    filename = file.filename
    file.save(f'./brain_scans/tumor_images/{filename}')

    img_path = './brain_scans/tumor_images/'+filename
    img = image.load_img(img_path, target_size=(224, 224))  # Resize the image to match the input shape of the model
    img_array = image.img_to_array(img)  # Convert image to array
    img_array = np.expand_dims(img_array, axis=0)  # Add an extra dimension to represent the batch size

    # Normalize the image
    img_array /= 255.0

    # Make the prediction
    predictions = loaded_model.predict(img_array)

    # Get the predicted class index
    predicted_class_index = np.argmax(predictions, axis=1)[0]


    # Get the corresponding label
    predicted_label = class_names[predicted_class_index]

    # Get the probability or confidence percentage
    confidence = predictions[0][predicted_class_index] * 100

    # Print the predicted class with the confidence percentage
    result = f'{predicted_label} sa sigurnošću od {confidence:.2f}%. '
    return result



if __name__ == '__main__':
    app.run(host='192.168.0.101',debug=True)