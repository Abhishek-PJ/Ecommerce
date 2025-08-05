# Cart Persistence Solution

## Problem
When users added items to their cart while logged out and then logged in, their cart would become empty. This was because the cart data wasn't being properly persisted across authentication states.

## Solution
Implemented a comprehensive cart persistence system that handles both anonymous and authenticated users:

### Key Features

1. **Anonymous User Support**: Cart items are saved to localStorage when users are not logged in
2. **Authenticated User Support**: Cart items are saved to Firebase when users are logged in
3. **Cart Merging**: When a user logs in, their anonymous cart is merged with their existing Firebase cart
4. **Automatic Persistence**: Cart changes are automatically saved without manual intervention

### Architecture

#### 1. Redux Store (`src/redux/cartSlice.jsx`)
- Modified to support both anonymous and authenticated cart storage
- Added new actions: `initializeAnonymousCart`, `saveAnonymousCart`
- Removed direct localStorage initialization to prevent conflicts

#### 2. Cart Persistence Hook (`src/hooks/useCartPersistence.js`)
- Centralized cart management logic
- Handles initialization, saving, and authentication state changes
- Provides `handleUserLogin` and `handleUserLogout` functions

#### 3. Cart Utilities (`src/utils/cartUtils.js`)
- Enhanced with cart merging functionality
- Added user authentication helpers
- Improved error handling and logging

#### 4. Component Updates
- Updated Login, GoogleAuth, and Navbar components to use the new persistence system
- Removed redundant localStorage.setItem calls from individual components
- Added the persistence hook to the main App component

### How It Works

1. **App Initialization**: The `useCartPersistence` hook initializes the appropriate cart based on authentication state
2. **Anonymous Shopping**: Cart items are saved to localStorage as `anonymousCart`
3. **User Login**: Anonymous cart is merged with user's Firebase cart, quantities are combined for duplicate items
4. **Authenticated Shopping**: Cart items are automatically saved to Firebase
5. **User Logout**: Cart is cleared and anonymous cart is initialized

### Usage

The cart persistence is automatically handled by the `useCartPersistence` hook in the main App component. No additional setup is required.

### Testing

To test the cart persistence:

1. **Anonymous Shopping**: Add items to cart while logged out
2. **Login**: Log in with an account - cart items should be preserved
3. **Logout**: Log out and verify cart is cleared
4. **Cross-Device**: Cart should persist across different devices for authenticated users

### Debugging

The system includes comprehensive logging to help debug issues:
- Cart initialization logs
- Save/load operation logs
- Cart merging logs
- Authentication state changes

Check the browser console for detailed information about cart operations. 