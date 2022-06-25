import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'

export default function ForumPost ({ userName, profilePic, post, time}) {

    const postDate = time;
    const todayDate = new Date();
    const diffTime = Math.abs(todayDate - postDate);
    const diffInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const printedOut = diffInDays <= 1 
                        ? Math.ceil(Math.abs(todayDate - postDate) / (60*60*1000)) + ' hours ago'
                        : diffInDays + ' days ago'
    
    return(
        <View style={styles.postcontainer}>
            <Text style={styles.name}>{userName}</Text>
            <Image style={styles.img} source = {{uri:profilePic}}></Image>
            <Text style={styles.post}>{post}</Text>
            <Text style={styles.time}>{printedOut}</Text>
        </View>
    )
    
}

const styles = StyleSheet.create({
    postcontainer: {
        height: 390,
        width: 390,
        borderRadius : 20,
        

    },

    name: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    img: {
        width: 200,
        height: 200
    },

    post : {
        fontSize: 15
    },

    time : {
        fontSize: 15,
        color: 'red'
    }
})

