import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {Welcome, Home, ListPosts, DetailPost, SearchKeyword, SignIn, SignUp, Profile} from "../screens/index";
import {LoadCategories, StorePost} from "../screens/post/index";
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
                <Stack.Screen name={"SignIn"} component={SignIn}/>
                <Stack.Screen name={"SignUp"} component={SignUp}/>
                <Stack.Screen name={"Profile"} component={Profile}/>
                <Stack.Screen name={"CategoryPost"} component={LoadCategories}/>
                <Stack.Screen name={"UploadPost"} component={StorePost}/>
                <Stack.Screen name={"TestApi"} component={TestApi}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
