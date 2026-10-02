import sys
import os
import pandas as pd
import joblib

# Ambil data yang dikirim dari backend Node.js
ingredient_count = int(sys.argv[1])
instruction_length = int(sys.argv[2])

# Ambil lokasi folder file ini
current_dir = os.path.dirname(os.path.abspath(__file__))

# Lokasi model ML
model_path = os.path.join(current_dir, "meal_classifier.pkl")

# Load model
model = joblib.load(model_path)

# Siapkan input sesuai format saat model dilatih
input_data = pd.DataFrame(
    [[ingredient_count, instruction_length]],
    columns=["ingredient_count", "instruction_length"]
)

# Prediksi
prediction = model.predict(input_data)

# Kirim hasil ke backend
print(int(prediction[0]))