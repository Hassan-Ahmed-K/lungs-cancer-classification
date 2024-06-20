import numpy as np
from tensorflow.keras.models import load_model
import os
from PIL import Image
from tensorflow.keras.applications import VGG16

lung_cancer_model = ""

def initLungCancerModel():
    global lung_cancer_model
    current_dir = os.path.dirname(__file__)
    relative_path = "../templates/lungs_cancer_classification.h5"
    model_path = os.path.abspath(os.path.join(current_dir, relative_path))
    lung_cancer_model = load_model(model_path)
    print(lung_cancer_model)
    
def predictLungCancer(image):
    # Open the image with error handling
    try:
        image = Image.open(image.stream)
    except FileNotFoundError:
        print("Error: Image file not found.")
        exit(1)
    except Exception as e:
        print(f"Error opening image: {e}")
        exit(1)

    # Convert to RGB if necessary
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Resize the image to 128x128 pixels
    resized_image = image.resize((150, 150))

    # Convert the resized image to a numpy array and normalize pixel values
    resized_image_array = np.array(resized_image) / 255.0
    resized_image_array = resized_image_array.reshape(1, 150, 150, 3)
    # resized_image_array = resized_image_array.flatten()
    conv = VGG16(include_top=False,input_shape=(150,150,3))
    prediction = conv.predict(resized_image_array)
    prediction = lung_cancer_model.predict(prediction)

    if(prediction > 0.6):
        confidence = prediction[0][0] * 100
        print(f"Lung Cancer Detected Confidence: {confidence:.2f}%")
    else:
        confidence = (1 - prediction[0][0]) * 100
        print(f"Lung Cancer Not Detected Confidence: {confidence:.2f}%")
    print(confidence)
    return True if prediction>0.6 else False
