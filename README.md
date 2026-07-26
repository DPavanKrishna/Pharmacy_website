# 💊 A2Z Pharmacy — Online Healthcare & E-Pharmacy Platform

A modern, responsive, full-featured E-Commerce Web Application built for online pharmacy management, medicine ordering, and healthcare services. Built with pure **HTML5, Modern CSS3, Vanilla JavaScript (ES6)**, and hosted via a **Node.js Express** server.

---

## 🌟 Key Features

- ** Modern & Responsive UI/UX**: Designed with modern UI standards (custom CSS design system, typography, glassmorphism headers, responsive grids, and micro-interactions).
- ** Dynamic Product Catalog**: Browse prescription & OTC medicines, health supplements, and medical devices. Includes live real-time search & category pill filters (OTC, Prescription, Vitamins, Devices).
- ** Interactive Shopping Cart**: Client-side cart persistence powered by `localStorage`, real-time price & quantity recalculations, and coupon promo integration (`HEALTH20`).
- ** Multi-Step Checkout & Payment**: Integrated shipping details form, payment method selector (UPI, Credit/Debit Card, Net Banking, Cash on Delivery), order summary card, and instant confirmation modal.
- ** Patient Account Dashboard**: View recent orders, active prescriptions, shipping addresses, and account details.
- ** Pharmacy Services**: Prescription upload workflow, 24/7 pharmacist helpline integration, and CDSCO compliance details.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, Modern CSS3 (Vanilla Design System), JavaScript (ES6) |
| **Icons & Fonts** | FontAwesome 6, Google Fonts (*Plus Jakarta Sans*) |
| **Backend / Server** | Node.js, Express.js |
| **Storage** | Browser `localStorage` (Client-side Cart & Session State) |

---

## 📁 Project Structure

```
Pharmacy_website/
├── index.html         # Homepage (Centered Hero, Features, Bestsellers, Banner)
├── Shop.html          # Full Medicine Catalog with Live Search & Filtering
├── sproduct.html      # Product Detail Page (Dosage, Pack Size, Quantity selector)
├── cart.html          # Shopping Cart & Order Summary with Promo Discount
├── payment.html       # Checkout & Multi-Method Payment Gateways
├── account.html       # Patient Profile & Order History Dashboard
├── about.html         # About Us & CDSCO Licensing Information
├── contact.html       # Contact Us, 24/7 Helpline & Inquiry Form
├── login.html         # User Authentication (Sign In / Register)
├── style.css          # Custom CSS Design System, Variables & Responsive Utilities
├── script.js         # Interactive Logic (Cart state, Search, Toast Notifications)
├── server.js          # Express Server for hosting static files
└── package.json       # Project dependencies and script configurations
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/DPavanKrishna/Pharmacy_website.git
   cd Pharmacy_website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm run serve
   ```
   *(or `node server.js`)*

4. **Access the Website**
   Open your browser and navigate to:
   👉 **`http://localhost:8080`**

---

## 🛒 Demo Coupon Code
- Apply promo code **`HEALTH20`** in the Shopping Cart page for **10% OFF** your total order!

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
