from flask import Flask, request
from flask_cors import CORS
import tensorflow as tf
import tensorflow_hub as hub
import tensorflow as tf
from keras import layers
from keras.models import Sequential
from keras.preprocessing import image
import numpy as np


loaded_model = tf.keras.models.load_model('./blood_cells/model.h5')
print(loaded_model.summary())