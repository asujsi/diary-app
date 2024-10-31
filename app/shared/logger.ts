import { Alert } from 'react-native';

export function initLogger(): void {
  // Basic console logging (can be enhanced with a logging library if needed)
  console.log("Logger initialized");

  // Catch unhandled promise rejections and log them
  process.on('unhandledRejection', (reason) => {
    console.error("Unhandled promise rejection: ", reason);
    Alert.alert("An error occurred", "Please try again.");
  });

  // Catch unhandled errors globally
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    console.error("An unhandled error occurred: ", error);
    if (isFatal) {
      Alert.alert("A fatal error occurred", "Please restart the app.");
    }
  });
}
