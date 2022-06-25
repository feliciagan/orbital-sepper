import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Grid, Row, Col } from "react-native-easy-grid";
import Avatar from "./Avatar";
import colors from "../assets/colors/colors.js";
import { useNavigation } from "@react-navigation/native";

export default function ChatListItem({
  description,
  user,
  time,
  room
}) {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ height: 80, borderBottomWidth: 1, borderBottomColor: colors.lightGray }}
      onPress={() => navigation.navigate("IndivChatScreen", { user: user, room: room })}
    >
      <Grid style={{ maxHeight: 80 }}>
        <Col
          style={{ width: 80, alignItems: "center", justifyContent: "center" }}
        >
          <Avatar user={user} size={50} />
        </Col>
        <Col style={{ marginLeft: 10 }}>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: colors.darkBlue }}
              >
                {user.displayName}
              </Text>
            </Col>
            {time && (
              <Col style={{ alignItems: "flex-end" }}>
                <Text style={{ color: colors.blue, fontSize: 11, marginRight: 10 }}>
                  {new Date(time.seconds * 1000).toLocaleDateString()}
                </Text>
              </Col>
            )}
          </Row>
          {description && (
            <Row style={{ marginTop: -5 }}>
              <Text style={{ color: colors.blue, fontSize: 13, marginRight: 20, overflow: 'hidden' }}>
                {description}
              </Text>
            </Row>
          )}
        </Col>
      </Grid>
    </TouchableOpacity>
  );
}