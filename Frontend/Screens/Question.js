import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { format } from "date-fns";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from "react-native";


const RadioButton = ({ options }) => {
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
     
      console.log('Selected Option:', option);
    };
  
    return (
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
              backgroundColor: selectedOption === option ? '#ABF4DF' : 'white',
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 15,
            
            }}
            onPress={() => handleOptionSelect(option)}
          >
            <Text style={{ color: 'black', fontSize:14 }}>{option}</Text>
            <TouchableOpacity
              onPress={() => handleOptionSelect(option)}
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                borderWidth: 2,
                borderColor: selectedOption === option ? "#4ABFB4" : "#4ABFB4",
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selectedOption === option ? "#4ABFB4" : 'white',
                
              }}
            >
              {selectedOption === option && (
                <View
                  style={{
                    height: 14,
                    width: 14,
                    borderRadius: 6,
                    backgroundColor: "#4ABFB4",
                  }}
                />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

const Question = () => {
 
    const options = ['1. Never', '2. Almost Never', '3. Sometimes', '4. Fairly Often', '5. Very Often']; // Your list of options


  return (
    <SafeAreaView>
        <Image source={require("../assets/back.png")} style = {{width:53 , height:53 , marginLeft :25} }></Image>
        <Image source={require("../assets/QuestionImage/qonevertical.png")} style = {{marginTop:32 , alignSelf:"center", width : 367}}></Image>
        <Text style = {styles.quesnum}>Question 1 of 10</Text>
        <Text style = {styles.quetext}>In the LAST MONTH, how often have you:</Text>
        <Text style = {styles.question}>Been upset because of something that happened unexpectedly?</Text>
        <Image source={require("../assets/QuestionImage/quesone.png")} style = {{width:180 , height:180, marginTop:33, alignSelf:"center"}}></Image>
        

        <View style={{ margin: 15 }}>
      <RadioButton options={options} />
    </View>

    <TouchableOpacity style = {styles.nextbtn}>
        <Text style={{ color: 'black', fontSize: 14 , alignSelf:"center" }}>Next</Text>
        </TouchableOpacity>

    </SafeAreaView>

  )
};

const styles = StyleSheet.create({

    quesnum :{
        marginLeft:22,
        marginTop:15,
        color:"#4ABFB4",
        fontSize:12,
        
    },

    quetext :{
        marginLeft:22,
        marginTop:38,
        color:"black",
        fontSize:16,
        
    },
    question :{
        marginLeft:22,
        color:"black",
        fontSize:16,
        
    },

    nextbtn :{
        
        marginTop:20,
         paddingVertical: 15,
        // paddingHorizontal: 20,
        width:144,
        height:48,
        borderRadius:20,
        alignSelf:"center",
        borderWidth: 2,
        borderColor:'#4A90BF',
        backgroundColor:"white"

        
    }


});

  export default Question;