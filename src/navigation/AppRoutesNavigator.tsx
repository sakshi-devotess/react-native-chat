import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../screens/Dashboard';
import Account from '../screens/Account';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { UnreadMessagesContext } from '../contexts/UnreadMessagesContext';
import Chats from '../screens/Chats';
import Settings from '../screens/Settings';
import { colors } from '../config/constants';
import About from '../screens/About';
import Help from '../screens/Help';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { unreadCount, setUnreadCount } = useContext(UnreadMessagesContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = route.name === 'Chats' ? 'chatbubbles' : 'settings';
          iconName += focused ? '' : '-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
        presentation: 'modal',
      })}
    >
      {/* <Tab.Screen name="Chats" options={{ tabBarBadge: unreadCount > 0 ? unreadCount : null }}>
        {() => <Chats setUnreadCount={setUnreadCount} />}
      </Tab.Screen> */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const AppRoutesNavigator = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
      <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
      {/* <Stack.Screen
      name="Chat"
      component={Chat}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader chatName={route.params.chatName} chatId={route.params.id} />,
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ChatMenu chatName={route.params.chatName} chatId={route.params.id} />
          </View>
        ),
      })}
    /> */}
      {/* <Stack.Screen name="Users" component={Users} options={{ title: 'Select User' }} /> */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="About" component={About} />

      <Stack.Screen name="Account" component={Account} />
      {/* <Stack.Screen name="Group" component={Group} options={{ title: 'New Group' }} />
    <Stack.Screen name="ChatInfo" component={ChatInfo} options={{ title: 'Chat Information' }} /> */}
    </Stack.Navigator>
  );
};

export default AppRoutesNavigator;
