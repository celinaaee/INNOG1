import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ExperienceScreen from "./screens/ExperienceScreen";
import ContactScreen from "./screens/ContactScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Mit CV" }}
        />

        <Stack.Screen
          name="Experience"
          component={ExperienceScreen}
          options={{ title: "Erfaring" }}
        />

        <Stack.Screen
          name="Contact"
          component={ContactScreen}
          options={{ title: "Kontakt" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
