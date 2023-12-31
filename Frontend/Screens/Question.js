import React, { useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const RadioButton = ({ options, selectedOption, onSelect }) => {
  const [selectedOptionInternal, setSelectedOptionInternal] = useState(null);

  useEffect(() => {
    setSelectedOptionInternal(selectedOption);
  }, [selectedOption]);

  const handleOptionSelect = (option) => {
    setSelectedOptionInternal(option);
    onSelect(option);
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
            backgroundColor: selectedOptionInternal === option ? '#ABF4DF' : 'white',
            paddingHorizontal: 10,
            paddingVertical: 7,
            borderRadius: 15,
          }}
          onPress={() => handleOptionSelect(option)}
        >
          <Text style={{ color: 'black', fontSize: 14 }}>{option}</Text>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: selectedOptionInternal === option ? "#4ABFB4" : "#4ABFB4",
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selectedOptionInternal === option ? "#4ABFB4" : 'white',
            }}
          >
            {selectedOptionInternal === option && (
              <View
                style={{
                  height: 14,
                  width: 14,
                  borderRadius: 6,
                  backgroundColor: "#4ABFB4",
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Question = () => {
  const [options, setOptions] = useState([]);
  const [ids, setIds] = useState([]);
  const [question, setQuestion] = useState('');
  const [id, setId] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

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
        const currentId = ids[currentQuestionIndex]._id;
        setId(currentId);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuestions();
  }, [currentQuestionIndex, ids]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.27:8070/question/get-question/${id}`);
        console.log(response.data);
        setQuestion(response.data);
        const optionTexts = response.data.options.map(option => option.OptionText);
        setOptions(optionTexts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleNextQuestion = () => {
    if (selectedOption) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset selected option when moving to the next question
    }
  };

  const handleBackButton = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={handleBackButton}>
        <Image source={require("../assets/back.png")} style={{ width: 53, height: 53, marginLeft: 25 }} />
      </TouchableOpacity>
      <Image source={require("../assets/QuestionImage/qonevertical.png")} style={{ marginTop: 32, alignSelf: "center", width: 367 }}></Image>
      {question && question.question && (
        <>
          <Text style={styles.quesnum}>Question {currentQuestionIndex + 1} of {ids.length}</Text>
          <Text style={styles.quetext}>{question.question}</Text>

          <Image source={{ uri: question.imgurl }} style={{ width: 180, height: 180, marginTop: 33, alignSelf: "center" }}></Image>
        </>
      )}

      <View style={{ margin: 15 }} >
        <RadioButton options={options} selectedOption={selectedOption} onSelect={setSelectedOption} />
      </View>

      <TouchableOpacity style={styles.nextbtn} onPress={handleNextQuestion} disabled={!selectedOption}>
        <Text style={{ color: 'black', fontSize: 14, alignSelf: "center" }}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quesnum: {
    marginLeft: 22,
    marginTop: 15,
    color: "#4ABFB4",
    fontSize: 12,
  },

  quetext: {
    marginLeft: 22,
    marginTop: 38,
    color: "black",
    fontSize: 16,
  },

  nextbtn: {
    marginTop: 20,
    paddingVertical: 15,
    width: 144,
    height: 48,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: '#4A90BF',
    backgroundColor: "white"
  }
});

export default Question;
