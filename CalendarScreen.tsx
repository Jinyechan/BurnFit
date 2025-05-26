import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {
  PanGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

interface WorkoutData {
  [key: string]: {
    selected: boolean;
    selectedColor: string;
    workout?: string;
  };
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [workoutData, setWorkoutData] = useState<WorkoutData>({});
  const [scaleValue] = useState(new Animated.Value(1));

  // Level 2: 캘린더 기본 기능
  const onDayPress = (day: any) => {
    const dateString = day.dateString;
    setSelectedDate(dateString);
    
    // 날짜 선택 시 애니메이션 효과
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Level 3: 제스처 핸들러 및 상태 관리
  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: scaleValue}}],
    {useNativeDriver: true}
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const {translationY} = event.nativeEvent;
      
      if (Math.abs(translationY) > 50) {
        // 스와이프 제스처 감지
        if (translationY > 0) {
          // 아래로 스와이프
          handleSwipeDown();
        } else {
          // 위로 스와이프
          handleSwipeUp();
        }
      }
      
      // 애니메이션 리셋
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSwipeUp = () => {
    if (selectedDate) {
      Alert.alert(
        '운동 추가',
        `${selectedDate}에 운동을 추가하시겠습니까?`,
        [
          {text: '취소', style: 'cancel'},
          {
            text: '확인',
            onPress: () => addWorkout(selectedDate),
          },
        ]
      );
    } else {
      Alert.alert('알림', '먼저 날짜를 선택해주세요.');
    }
  };

  const handleSwipeDown = () => {
    if (selectedDate && workoutData[selectedDate]) {
      Alert.alert(
        '운동 삭제',
        `${selectedDate}의 운동을 삭제하시겠습니까?`,
        [
          {text: '취소', style: 'cancel'},
          {
            text: '확인',
            onPress: () => removeWorkout(selectedDate),
          },
        ]
      );
    }
  };

  const addWorkout = (date: string) => {
    const newWorkoutData = {
      ...workoutData,
      [date]: {
        selected: true,
        selectedColor: '#00adf5',
        workout: '운동 완료',
      },
    };
    setWorkoutData(newWorkoutData);
    Alert.alert('성공', '운동이 추가되었습니다!');
  };

  const removeWorkout = (date: string) => {
    const newWorkoutData = {...workoutData};
    delete newWorkoutData[date];
    setWorkoutData(newWorkoutData);
    Alert.alert('성공', '운동이 삭제되었습니다!');
  };

  // 통계 계산
  const totalWorkouts = Object.keys(workoutData).length;
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const monthlyWorkouts = Object.keys(workoutData).filter(date => {
    const dateObj = new Date(date);
    return dateObj.getMonth() + 1 === currentMonth && dateObj.getFullYear() === currentYear;
  }).length;

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}>
          <Animated.View style={[styles.content, {transform: [{scale: scaleValue}]}]}>
            <Text style={styles.title}>2022년 7월</Text>
            
            <Calendar
              onDayPress={onDayPress}
              markedDates={{
                ...workoutData,
                [selectedDate]: {
                  selected: true,
                  selectedColor: selectedDate in workoutData ? '#00adf5' : '#ff6b6b',
                },
              }}
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: '#00adf5',
                monthTextColor: '#2d4150',
                indicatorColor: '#00adf5',
                textDayFontWeight: '300',
                textMonthFontWeight: 'bold',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 13,
              }}
              style={styles.calendar}
            />

            {/* 통계 영역 */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalWorkouts}</Text>
                <Text style={styles.statLabel}>작업 0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{monthlyWorkouts}</Text>
                <Text style={styles.statLabel}>완료 0</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>0</Text>
                <Text style={styles.statLabel}>신태 0</Text>
              </View>
            </View>

            {/* 도움말 텍스트 */}
            <Text style={styles.helpText}>
              위치 버튼을 통해{'\n'}
              삭제 가능해보세요
            </Text>

            {/* 플러스 버튼 */}
            <TouchableOpacity 
              style={styles.plusButton}
              onPress={() => handleSwipeUp()}>
              <Text style={styles.plusButtonText}>+</Text>
            </TouchableOpacity>

            {/* 제스처 안내 */}
            <Text style={styles.gestureHelp}>
              위로 스와이프: 운동 추가{'\n'}
              아래로 스와이프: 운동 삭제
            </Text>
          </Animated.View>
        </PanGestureHandler>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  calendar: {
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d4150',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  helpText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 80,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00adf5',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  gestureHelp: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontSize: 12,
    color: '#999',
  },
});
