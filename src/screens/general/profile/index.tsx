import React, { useEffect } from "react";
import { View, StatusBar, ImageBackground, Pressable } from "react-native";
import CustomText from "../../../shared/components/customText";
import { styles } from "./styles";
import {
  organicBG,
  reward,
  CompltAccPic,
  starforAcc,
  fillStarForAcc,
  myProfile,
  rejectedPic,
  setting,
} from "../../../assets/images";
import FastImage from "react-native-fast-image";
import { GST, RF, THEME } from "../../../shared/exporter";
import { CusView } from "../../../shared/components/cusViewForProfile";
import { navigate } from "../../../shared/services/nav.service";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { signOut } from "../../../shared/redux/reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";

const { grey, white, primary } = THEME.colors;

const Profile = () => {
  const { user } = useSelector((state: any) => state.root.user);
  const disptach = useDispatch();
  
  const onLogOut = () => {
    disptach(signOut());
  };
  const onPressEdit = () => {
    navigate("EditProfile");
  };
  const onPressSettings = () => {
    navigate("Settings");
  };
  const onPressFavourites = () => {
    navigate("Favorites");
  };
  const onPressRejectedOffers = () => {
    navigate("RejectedOffers");
  };

  return (
    <View style={styles.container}>
      <Header
        profilePic={user?.image_path}
        onPressEdit={onPressEdit}
        name={user?.name}
        email={user?.email}
      />
      <VerifySection />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RF(70),
          paddingTop: RF(30),
          marginTop: RF(58),
        }}
      >
        <Section
          onPressFavourites={onPressFavourites}
          onPressEdit={onPressEdit}
          onPressRejectedOffers={onPressRejectedOffers}
          onPressSettings={onPressSettings}
        />
        <Pressable onPress={onLogOut} style={styles.lastBtn}>
          <Icon name="poweroff" size={15} color={primary} />
          <CustomText style={{ paddingLeft: RF(10) }} size={14}>
            Log Out
          </CustomText>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const Header = ({
  onPressEdit,
  name,
  email,
  profilePic,
}: {
  onPressEdit: () => void;
  email: any;
  name: any;
  profilePic: any;
}) => {
  return (
    <ImageBackground source={organicBG} style={styles.headerView}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
     <View style={GST.mt1}>
     {profilePic !== null ? (
        <FastImage style={styles.profilePic} source={{ uri: profilePic }} />
      ) : (
        <View style={styles.iconView}>
          <Icon name={"user"} size={RF(30)} color={primary} />
        </View>
      )}
     </View>

      <CustomText color={white} bold size={14} style={styles.name}>
        {name}
      </CustomText>
      <CustomText color={white} bold size={12} style={styles.email}>
        {email}
      </CustomText>
      <Pressable onPress={onPressEdit} style={styles.btn}>
        <CustomText style={styles.btnText} size={14}>
          Edit
        </CustomText>
      </Pressable>
      <View style={styles.rewardView}>
        <FastImage style={styles.rewardImage} source={reward}></FastImage>
        <CustomText style={styles.rewradTxt} size={14} bold color={white}>
          650{" "}
          <CustomText size={14} bold color={white}>
            Points
          </CustomText>
        </CustomText>
      </View>
    </ImageBackground>
  );
};

const VerifySection = () => {
  return (
    <View style={styles.completeAccView}>
      <FastImage style={styles.compltAccpic} source={CompltAccPic} />
      <View style={styles.miniView}>
        <CustomText size={14} bold>
          Complete your account
        </CustomText>
        <CustomText style={{ paddingRight: RF(10) }} color={grey}>
          Please verify your identity to complete
          <CustomText color={grey}> your profile by uploading doc.</CustomText>
        </CustomText>
      </View>
    </View>
  );
};

const Section = ({
  onPressFavourites,
  onPressEdit,
  onPressRejectedOffers,
  onPressSettings,
}: {
  onPressFavourites: () => void;
  onPressEdit: () => void;
  onPressRejectedOffers: () => void;
  onPressSettings: () => void;
}) => {
  return (
    <View style={styles.contentView}>
      <CustomText bold size={14}>
        Account
      </CustomText>
      <CusView imageSrc={starforAcc} contentEnteries={"Loyality Points"} />
      <CusView
        onPress={onPressFavourites}
        imageSrc={fillStarForAcc}
        contentEnteries={"Favourites"}
      />
      <CusView
        onPress={onPressEdit}
        imageSrc={myProfile}
        contentEnteries={"My Profile"}
      />
      <CusView
        onPress={onPressRejectedOffers}
        imageSrc={rejectedPic}
        contentEnteries={"Rejected Offers"}
      />
      <CusView
        onPress={onPressSettings}
        imageSrc={setting}
        contentEnteries={"Settings"}
      />
    </View>
  );
};

export default Profile;