import React, { Component } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `http://localhost:5000/star?name=${this.props.navigation.getParam("Star_name")}`
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        this.setDetails(response.data.data);
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = StarDetails => {
    const StarType = StarDetails.Star_type;

    this.setState({
      details: StarDetails,
    });
  };

  render() {
    const { details, imagePath } = this.state;
      return (
        <View style={styles.container}>
          <Card title={details.Star_name}>
            <View>
              <Text style={styles.cardItem}>
                  {`Distance from hosts star : ${details.Distance}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Mass in kg : ${details.mass_in_kg}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Radius (in metre): ${details.radius_in_metre}`}
              </Text>

              <Text style={styles.cardItem}>
                {`Gravity : ${details.star_gravity}`}
              </Text>

            </View>
            
          </Card>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});