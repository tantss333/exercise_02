# React Native Message App Demo 

This is a mobile message demo application built with **React Native**.  
It demonstrates directories, messages, messages management.

---

## Project Structure

```
MessageApp/                      # root folder
├── App.tsx                      # App entry with NavigationContainer
├── index.ts                     # Entry point
├── app.json / package.json      # Configuration files
├── 
├── src/
│   └──assets/
│   │    └── images/             # Icons for message categories
│   │          ├── family.png
│   │          ├── work.png
│   │          ├── school.png
│   │          └── ...more icons
│   ├── data/
│   │   └── messageData.ts       # Default message data for all categories
│   ├── navigation/
│   │   └── TabNavigator.tsx     # Optional bottom tab navigation
│   └── screens/
│       ├── DirectoryScreen.tsx    # Main category directory screen
│       └── MessageListScreen.tsx  # Message list screen (search + add + delete)


```

---

## IDE Platform for Coding: Android Studio

## Github Url: https://github.com/tantss333/exercise_01.git


## 📲 How to Install and Run the App

1. **Install Flutter SDK**  
   - [Flutter installation guide](https://flutter.dev/docs/get-started/install)

2. **Clone this repository:**
   ```
   git clone https://github.com/tantss333/exercise_01.git
   cd exercise_01
   ``` 

3. **Install dependencies:**
   ```bash
   flutter pub get
   ```

4. **Run the app:**
   - Be sure that load the project from the root folder, for example: **exercise_01**

   - Be sure you **connect your mobile device**(either virtual or practical) in IDE

   - In **Android Studio**: click ▶️ next to `main.dart`

   - In **Intellij**: click ▶️ next to `main.dart`

   - Or via terminal:
     ```bash
     flutter run
     ```

5. **To test on Chrome:**
   ```bash
   flutter config --enable-web
   flutter devices
   flutter run -d chrome
   ```

---

## 🖼 Screenshots


| ![Welcome](screenshots/welcome_screen.png) | ![Main](screenshots/main_screen.png) |
|:--:|:--:|
| Welcome Page | Main Page |

| ![Detail](screenshots/product_screen.png) | ![Cart](screenshots/cart_screen.png) |
|:--:|:--:|
| Product Details | Cart Page |

---

## ✅ Features Implemented

- 🏠 Welcome screen with navigation
- 🛍 Product listing with image + price
- 📦 Detail screen with size selection + validation
- 🛒 Cart screen with:
  - Total price + item count
  - Multi-select checkboxes
  - Delete item
  - "Checkout selected" button (only button)

---

## ⚠ Notes

- Make sure assets are declared in `pubspec.yaml` (e.g. `resource/images/`)
- If you're using a custom folder like `assets/`, update image paths accordingly

---

## 📌 Author

- Student: Sheng Tan  
- Student ID: 1252550