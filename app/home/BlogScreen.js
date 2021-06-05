import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  RefreshControl,
  Dimensions,
  SectionList,
  TouchableHighlight,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ImageBackground,
  ActivityIndicator,
  WebView,
} from "react-native";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Dropdown } from "react-native-material-dropdown";

import { Font } from "expo-font";

import HTML from "react-native-render-html";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import moment from "moment";
import Dialog, { DialogContent } from "react-native-popup-dialog";

class BlogScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      isLoading: true,
      isLoadingCats: true,
      categories: [],
      dataSource: [],
    };
    this.state.visibleCategory = false;
    this.state.categoryName = "Filteri";
    this.state.category = "";
  }
  componentDidMount() {
    this.loadAssetsAsync();
    this.downloadData();
  }

  onChangeCategoryPress(value) {
    this.setState((previousState) => ({
      category: "" + value.id,
      categoryName: value.title,
      visibleCategory: false,
    }));
    this.downloadData();
  }

  downloadData() {
    fetch("https://api.360bih.ba/api/blog_posts")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
            refreshing: false,
          },
          function() {}
        );
      })
      .catch((error) => {
        console.error(error);
      });

    fetch("https://api.360bih.ba/api/categories")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            categories: responseJson,
            refreshing: false,
          },
          function() {}
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  loadAssetsAsync = async () => {
    await Font.loadAsync({
      "Roboto-Regular": require("../../assets/fonts/rregular.ttf"),
      "Roboto-Medium": require("../../assets/fonts/rmedium.ttf"),
      "Roboto-Light": require("../../assets/fonts/rlight.ttf"),
      "Roboto-Bold": require("../../assets/fonts/rbold.ttf"),
    });
    this.setState({ fontLoaded: true });
  };

  _openBlog = (article) => {
    const { navigate } = this.props.navigation;
    navigate({
      routeName: "SingleBlog",
      params: { ...article },
    });
  };

  renderRowTwo = ({ item }) => (
    <View style={styles.cardContainer} backgroundColor="#fff">
      <TouchableOpacity
        key={item.id}
        style={styles.itemTwoContainer}
        onPress={() => this._openBlog(item)}
      >
        <View style={styles.itemTwoContainer}>
          <View style={styles.itemTwoContent}>
            <Image
              style={styles.itemTwoImage}
              source={{ uri: item.image.content_url }}
            />
            <View
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                backgroundColor: "#ffffff",
                width: 89,
                height: 20,
                borderRadius: 22,
                overflow: "hidden",
                textAlign: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#3f4968",
                  fontSize: 14,
                  fontFamily: "GTWalsheimProM",
                }}
              >
                {item.category.title}
              </Text>
            </View>
          </View>
          <View style={styles.itemTwoContainer2}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 16,
                marginBottom: 8,
              }}
            >
              <MaterialIcons
                name="calendar-today"
                size={14}
                color="rgba(63, 73, 104, 0.5)"
              />
              <Text style={styles.itemOneSubTitle} numberOfLines={1}>
                {moment(item.created_at).format("DD.MM.YYYY.")}
              </Text>
            </View>

            <Text
              style={{
                fontFamily: fonts.primaryMedium,
                color: "#3f4968;",
                fontSize: 20,
                marginBottom: 8,
              }}
              numberOfLines={2}
            >
              {item.title}
            </Text>
            <HTML
              style={{ marginTop: 12,height:75 }}
              html={"<k>" + item.content + "</k>"}
              renderers={{
                k: (htmlAttribs, children, convertedCSSStyles, passProps) => (
                  <Text
                    textAlign="justify"
                    numberOfLines={3}
                    style={{ color: "rgba(63, 73, 104, 0.8)", fontSize: 16, fontFamily: fonts.primaryLight,lineHeight:20
                  }}
                  >
                    {children}
                  </Text>
                ),
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.downloadData();
  };

  _getRenderItemFunction = () => [this.renderRowTwo][0];

  render() {
    let data = [];
    let copyDataSource = [];
    this.state.dataSource.forEach((item) => {
      if (
        this.state.category &&
        this.state.category.length > 0 &&
        item.category
      ) {
        if (item.category.id === this.state.category) {
          copyDataSource.push(item);
        }
      } else {
        copyDataSource.push(item);
      }
    });
    this.state.dataSource = copyDataSource;
    // console.log(copyDataSource);
    if (this.state.categories) {
      this.state.categories.forEach((el) => {
        el.value = el.title;
      });
    }
    if (!this.state.fontLoaded) {
      return <View />;
    }
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      const groupedData = copyDataSource;

      return (
        <ScrollView
          style={styles.container}
          refreshControl={
            <RefreshControl
              colors={["#0C8BB2", "#0C8BB2", "#0C8BB2"]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={styles.cardContainer}>
            <View style={{ height: 50 }}>
              <Text
                style={{
                  fontFamily: fonts.primaryMedium,
                  fontSize: 30,
                  color: "#3f4968",
                  marginTop: 10,
                }}
              >
                Blog i novosti
              </Text>
            </View>

            <Dialog
              style={{ marginLeft: 16, marginRight: 16 }}
              visible={this.state.visibleCategory}
              onTouchOutside={() => {
                this.setState({ visibleCategory: false });
              }}
            >
              <DialogContent style={{ paddingTop: 16, height: 250 }}>
                <ScrollView style={{ height: 250 }}>
                  {this.state.categories.map((city, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.onChangeCategoryPress(city);
                        }}
                      >
                        <Text
                          style={{
                            color: "#4A4A4A",
                            fontSize: 16,
                            width: Dimensions.get("screen").width - 64,
                            height: 32,
                          }}
                        >
                          {city.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </DialogContent>
            </Dialog>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                marginTop: -6,
                marginBottom: 0,
              }}
            >
              {/* <TouchableOpacity onPress={() => {
              this.setState({ visibleCategory: true });
            }}>
              <View style={{ width: Dimensions.get('window').width - 32 }}>
                <View style={{ borderColor: "#D8D8D8", borderWidth: 1, borderRadius: 4, height: 40, display: "flex", flexDirection: "row" }}>
                  <MaterialIcons name="filter-list" size={16} color="#4A4A4A" style={{ marginLeft: 8, marginTop: 12 }} />
                  <Text style={{ color: "#4A4A4A", fontSize: 14, marginLeft: 16, marginTop: 12 }}>
                    {this.state.categoryName}
                  </Text>
                </View>
              </View>
            </TouchableOpacity> */}
              <Dropdown
                containerStyle={{
                  width: Dimensions.get("window").width,
                  paddingLeft: 2,
                  paddingRight: 30,
                }}
                label="Filteri"
                data={this.state.categories}
                onChangeText={(value, index, data) => {
                  this.onChangeCategoryPress(data[index]);
                }}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: "#D1D3D4",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />

          <FlatList
            keyExtractor={(item) =>
              item.id
                ? `${this.props.tabIndex}-${item.id}`
                : `${item[0] && item[0].id}`
            }
            style={{ backgroundColor: colors.white }}
            data={groupedData}
            renderItem={this._getRenderItemFunction()}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    alignSelf: "stretch",
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get("window").width / 2 - 20,
  },
  itemOneImageContainer: {
    borderRadius: 5,
    overflow: "hidden",
  },
  itemOneImage: {
    borderRadius: 5,
    height: 143,
    width: Dimensions.get("window").width / 2 - 30,
  },
  itemOneTitle: {
    color: "#4A4A4A",
    fontFamily: fonts.primaryBold,
    fontSize: 16,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryLight,
    fontSize: 12,
    color: "rgba(63, 73, 104, 0.5)",
    height: 18,
    marginLeft: 10,
  },
  itemOneSubTitleRight: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: "#4A4A4A",
    marginVertical: 3,
    height: 18,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
  },
  itemOneRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoCard: {
    flex: 1,
    backgroundColor: "white",
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 2,
    marginTop: 6,
  },
  itemTwoContainer: {
    borderRadius: 5,
    overflow: "hidden",
    flex: 1,
    backgroundColor: "white",
  },
  itemTwoContainer2: {
    flex: 1,
    backgroundColor: "white",
  },
  itemTwoContent: {
    padding: 20,
    position: "relative",
    height: 150,
    borderRadius: 8,
    overflow: "hidden",
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#6271da",
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: "white",
  },
  itemThreeSubContainer: {
    flexDirection: "row",
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: "#617ae1",
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: "#5F5F5F",
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: "#a4a4a4",
  },
  itemThreeMetaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: "#5f5f5f",
    textAlign: "right",
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: "#e3e3e3",
    marginRight: -15,
  },
  itemOpisPosla: {},
  itemOneProcitajVise: {
    fontSize: 13,
    color: colors.primary,
    fontFamily: fonts.primaryRegular,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default BlogScreen;
