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
  ActivityIndicator,

} from "react-native";
import axios from "axios";


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
 
    const[options,SetOptions] = useState([]);
    const [ids, setIds] = useState([]);
    const [question, setQuestion] = useState('');
    const [id, setId] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {

      const fetchQuestionIds = async () => {
          try {
              const response = await axios.get('http://192.168.1.27:8070/question/get-all-question-ids');
              console.log(response.data);
              setIds(response.data);
          } catch (err) {
              console.log(err);
          }
      };
      fetchQuestionIds();
  }, []);

  useEffect(() => {
      const fetchQuestions = async () => {
          try {
              // Update the id before making the API call
              const currentId = ids[currentQuestionIndex]._id;
              setId(currentId);
              console.log(id);
          } catch (err) {
              console.log(err);
          }
      };
      fetchQuestions();
  }, [currentQuestionIndex, ids]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              // Make sure id has been updated before making the API call
              const response = await axios.get(`http://192.168.1.27:8070/question/get-question/${id}`);
              console.log(response.data);
              setQuestion(response.data);
              
              const optionTexts = response.data.options.map(option => option.OptionText);
              SetOptions(optionTexts);
          } catch (err) {
              console.log(err);
          }
      };
      fetchData();
  }, [id]);

  console.log(question);
  console.log(currentQuestionIndex);
  console.log(ids[currentQuestionIndex]);

  const handleNextQuestion = () => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <SafeAreaView>
          <Image source={require("../assets/back.png")} style={{ width: 53, height: 53, marginLeft: 25 }}></Image>
          <Image source={require("../assets/QuestionImage/qonevertical.png")} style={{ marginTop: 32, alignSelf: "center", width: 367 }}></Image>
          {question && question.question && (
            <>
              <Text style={styles.quesnum}>Question {currentQuestionIndex + 1} of {ids.length}</Text>
              <Text style={styles.quetext}>{question.question}</Text>

              <Image source={{ uri: question.imgurl }} style={{ width: 180, height: 180, marginTop: 33, alignSelf: "center" }}></Image>
            </>
          )}


    <View style={{ margin: 15 }} >
        <RadioButton options={options} />
    </View>

          <TouchableOpacity style={styles.nextbtn} onPress={handleNextQuestion}>
            <Text style={{ color: 'black', fontSize: 14, alignSelf: "center" }}>Next</Text>
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