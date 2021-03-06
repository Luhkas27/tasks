import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Platform,
  StatusBar
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import todayImage from "../../assets/imgs/today.jpg";
import commonStyles from "../commonStyles";
import Task from "../components/Task";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Agenda extends Component {
  state = {
    tasks: [
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      },
      {
        id: Math.random(),
        desc: "Estudar React-Native",
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: "Aplicar estudos React-Native",
        estimateAt: new Date(),
        doneAt: null
      }
    ],
    visibleTasks: [],
    showDoneTasks: true
  };

  filterTasks = () => {
    let visibleTasks = null;
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks];
    } else {
      const pending = task => task.doneAt === null;
      visibleTasks = this.state.tasks.filter(pending);
    }
    this.setState({ visibleTasks });
  };

  toggleFilter = () => {
    this.setState(
      { showDoneTasks: !this.state.showDoneTasks },
      this.filterTasks
    );
  };

  componentDidMount = () => {
    this.filterTasks();
  };

  toggleTask = id => {
    const tasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task = { ...task };
        task.doneAt = task.doneAt ? null : new Date();
      }
      return task;
    });
    this.setState({ tasks }, this.filterTasks);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <ImageBackground source={todayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subtitle}>
              {moment()
                .locale("pt-br")
                .format("ddd, D [de] MMMM")}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => (
              <Task {...item} toggleTask={this.toggleTask} />
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  taskContainer: {
    flex: 7
  },
  iconBar: {
    marginTop: Platform.OS === "ios" ? 30 : 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
