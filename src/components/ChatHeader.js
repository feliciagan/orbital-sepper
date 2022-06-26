import React from "react";
import { View, Text } from "react-native";
import Avatar from "./Avatar.js";
import colors from "../assets/colors/colors.js";
import { useRoute } from "@react-navigation/native";

export default function ChatHeader() {
    const route = useRoute();
  return (
    <View style={{ flexDirection: "row", flex: 1,  }}>
      <View>
        <Avatar size={40} user={route.params.user} />
      </View>
      <View
        style={{
          marginLeft: 15,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.darkBlue, fontSize: 18, fontWeight: 'bold' }}>
          {route.params.user.displayName}
        </Text>
      </View>
    </View>
  );
}