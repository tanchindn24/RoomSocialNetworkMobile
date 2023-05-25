import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Welcome, Home, ListPosts, DetailPost, SearchKeyword} from "../screens/index";
import TestApi from "../screens/TestApi";

const Stack = createNativeStackNavigator()
function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name={"Welcome"} component={Welcome}/>
                <Stack.Screen name={"Home"} component={Home}/>
                <Stack.Screen name={"ListPosts"} component={ListPosts}/>
                <Stack.Screen name={"DetailPost"} component={DetailPost}/>
                <Stack.Screen name={"SearchKeyword"} component={SearchKeyword}/>
                <Stack.Screen name={"TestApi"} component={TestApi}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
