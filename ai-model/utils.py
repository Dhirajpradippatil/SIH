from PIL import Image
import numpy as np

def is_blank_image(file_path, threshold=10):
    image = Image.open(file_path).convert("L")  # Convert to black & white
    arr = np.array(image)
    std_dev = np.std(arr)
    return std_dev < threshold
# from PIL import Image
# import numpy as np
# def is_blank_image(image_path):
#     try:
#         img = Image.open(image_path).convert("L")  # grayscale
#         hist = img.histogram()
#         if sum(hist[1:]) == 0:   # all pixels same (blank)
#             return True
#         return False
#     except Exception:
#         return True