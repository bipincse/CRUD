import * as React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Register from "../src/screens/Register";
import Home from "../src/screens/Home";
import EmpDetails from "../src/screens/EmpDetails";
import EditEmployee from "../src/screens/EditEmployee";
const Stack = createStackNavigator();

function MainStackNavigation() {

    return (
        <NavigationContainer>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Home"
            >

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="EmpDetails" component={EmpDetails} />
                <Stack.Screen name="EditEmployee" component={EditEmployee} />

            </Stack.Navigator>

        </NavigationContainer>
    );
}

export default MainStackNavigation;