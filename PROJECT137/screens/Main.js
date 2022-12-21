import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      url: "http://localhost:5000/"
    };
  }

  componentDidMount() {
    this.getStars();
  }

  getStars = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        return this.setState({
          data: response.data.data
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={item.name}
      subtitle={`Mass: ${item.mass_in_kg} kg`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { Star_name: item.name })
      }
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { data } = this.state;

    if (data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Sorry, we ran into a problem</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Stars</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda"
  }
});