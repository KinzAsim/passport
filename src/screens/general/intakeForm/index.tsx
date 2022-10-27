import React, {useRef, useEffect, useState} from 'react';
import {
  Pressable,
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import HeaderWrapper from '../../../shared/components/headerWrapper';
import Input from '../../../shared/components/input';
import {styles} from './styles';
import Button from '../../../shared/components/button';
import CustomText from '../../../shared/components/customText';
import {
  getIntakeForm,
  GST,
  postIntakeForm,
  showToast,
  THEME,
  RF,
} from '../../../shared/exporter';
import DatePicker from 'react-native-date-picker';
import LoadingOverlay from '../../../shared/components/loadingOverlay';
// import SignaturePad from 'react-native-signature-pad';
import CustomCB from '../../../shared/components/customCB';
import moment from 'moment';
import ActionSheet from 'react-native-actions-sheet';
// import TagInput from 'react-native-tag-input';
import CustomPhoneInput from '../../../shared/components/customPhoneInput/customPhoneInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {format as prettyFormat} from 'pretty-format';
import DropDownInput from '../../../shared/components/DropDownInput';
import Sign from '../../../shared/components/signature';
import {
  ImageLibraryOptions,
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import Camera from 'react-native-vector-icons/AntDesign';
import RNFetchBlob from 'rn-fetch-blob';
import {useSelector} from 'react-redux';

const {primary, gray} = THEME.colors;

const IntakeForm = ({navigation, route}: any) => {
  const {user} = useSelector((state: any) => state.root.user);
  const ref: any = useRef();
  const [loading, setloading] = useState(false);
  const [valueCB, setvalueCB] = useState<any>([]);
  const [imageArray, setImagearray] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [input, setInput] = useState<any>('');
  const [gender, setGender] = useState<any>([]);
  const [gendervalue, setGendervalue] = useState<any>('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [datetype, setdatetype] = useState<any>('');
  const [selectState, setSelectState] = useState([]);
  const [dynamicForm, setDynamicForm] = useState<any>(null);
  const [intakeForm, setintakeForm] = useState<any>({});
  const [showPicker, setshowPicker] = useState(false);
  const [pickerTitle, setPickerTitle] = useState('Select......');
  const [SelpickerTitle, setSelpickerTitle] = useState<any>([]);
  const [categores, setCategories]: any = useState<any>([]);
  const [brands, setBrands] = useState<any>([]);
  const [strains, setStrains] = useState<any>([]);
  // const [enableScrollViewScroll, setenableScrollViewScroll] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [showSignature, setshowSignature] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState({});
  const [termsFlag, setTermsFlag] = useState(false);
  const [errorfor, setErrorFor] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [state, setState] = useState<any>({});
  const [valueIndex, setvaluIndex] = useState(0);
  const [selectedItem, setSelectedItem]: any = useState(null);
  const item = route?.params?.item;
  const QRcode = route?.params?.qr_code;
  const lat = route?.params?.lat;
  const lon = route?.params?.lon;
  const dispensaryName = route?.params?.name;

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    // maxWidth: RF(1000),
    // maxHeight: RF(1000),
    quality: 1,
    selectionLimit: 1,
  };
  useEffect(() => {
    fetchIntakeFormServ();

    setTimeout(() => {
      setshowSignature(true);
    }, 1000);
  }, []);
  // const addIntakeHelper = async (key: any, value: any) => {
  //   // console.log('dataaa....', key, value);

  //   addIntakeForm(key, value);
  // };

  // useEffect(() => {
  //   // console.log('user', user);
  //   Object.keys(user).map(item => {
  //     if (
  //       item == 'name' ||
  //       item == 'middle_name' ||
  //       item == 'last_name' ||
  //       item == 'email' ||
  //       item == 'phone_number' ||
  //       item == 'gender' ||
  //       item == 'date_of_birth' ||
  //       item == 'address'
  //     ) {
  //       // console.log('ii...', item, user[item]);
  //       addIntakeHelper(item, user[item]);
  //     }
  //   });
  // }, []);
  const [imageid, setimage] = useState<any>('');
  const ImageUPload = (data: any) => {
    setimage(data);
    resetError();
    ref.current?.show();
  };

  const cameraImageHandler = () => {
    launchCamera(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        // setUploadedPhotos(res?.assets[0]);
        // convertImage(res?.assets[0].uri);
        ImageTake(res);
      }
      ref.current?.hide();
    });
  };
  const ImageTake = (res: any) => {
    let value = imageArray.map((item: any) => {
      if (item['id'] == imageid) {
        return {
          ...item,
          images: [...item?.images, res?.assets[0]],
        };
      } else return item;
    });
    console.log('dvbsmhdfbvsdf', res?.assets[0], value);
    // convertImage
    setImagearray(value);
  };
  const galleryImageHandler = () => {
    launchImageLibrary(options, (res: any) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        // console.log('imageressss..', res);
        // setUploadedPhotos(res?.assets[0]);
        // convertImage(res?.assets[0].uri);
        ImageTake(res);
      }
      ref.current?.hide();
    });
  };
  const convertImage = (id: any, data: any) => {
    let array: any = [];
    data.forEach(async (item: any) => {
      const content = await RNFetchBlob.fs.readFile(item?.uri, 'base64');
      array.push(`data:image/png;base64,${content}`);
    });
    addIntakeForm(id, String(array[0]));
  };
  const resetError = () => {
    setErrorMsg('');
    setErrorFor('');
  };
  const delImage = (data: any, image: any, index: any) => {
    setImagearray(
      imageArray.map((item: any) => {
        if (item?.id == data) {
          let array = item?.images.filter(
            (item: any, ind: any) => ind !== index,
          );
          return {
            ...item,
            images: array,
          };
        } else return item;
      }),
    );
  };
  const fetchIntakeFormServ = () => {
    setloading(true);
    const param = {
      id: item.id,
    };
    getIntakeForm(param)
      .then((res: any) => {
        let tempForm = JSON.parse(res.data.data.intake_form.form);
        // let enumObj = [
        //   {type: 'name'},
        //   {type: 'last_name'},
        //   {type: 'email'},
        //   {type: 'middle_name'},
        //   {type: 'phone'},
        //   {type: 'Gender'},
        //   {type: 'date_of_birth'},
        // ];
        // Object.keys(tempForm).forEach(key => {
        //   if (enumObj.some(ii => ii.type == tempForm[key][ii.type])) {
        //     if (key == 'first_name') {
        //       tempForm[key].value = user?.first_name;
        //     } else {
        //       tempForm[key].value = user[key];
        //     }
        //   }
        // });
        let formitake = {...tempForm};
        let userObject = {...user};
        userObject['image'] = userObject['image_path'];
        Object.values(tempForm).forEach((item: any) => {
          if (item['is_mandatory_field'] == 1) {
            let value = Object.keys(userObject).map((elem: any) => {
              let typecheck = elem === 'phone_number' ? 'phone' : elem;
              if (typecheck === item['type']) {
                return {
                  ...item,
                  value: userObject[elem],
                };
              }
            });
            value = value.filter(item => item !== undefined)[0];
            formitake[`${item.id}`] = value;
          }
        });
        setDynamicForm(formitake);
        let data = Object.values(tempForm).map((item: any) => {
          if (item['type'] === 'terms') {
            return {
              ...item,
              selected: false,
            };
          }
        });
        data = data.filter(item => item !== undefined);
        let imag = Object.values(tempForm).map((item: any) => {
          if (item['type'] === 'image') {
            return {
              ...item,
              images: [],
            };
          }
        });
        imag = imag.filter(item => item !== undefined);
        setImagearray(imag);
        setvalueCB(data);
        console.log('dsjhvbamhjsbdvdf', tempForm);
        Object.keys(formitake).map((data: any, index) => {
          if (
            formitake[data]?.type == 'terms' &&
            formitake[data]?.is_required == 1 &&
            formitake[data]?.is_enabled == 1
          ) {
            setTermsFlag(true);
          }
        });
      })
      .catch((err: any) => {
        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  const addIntakeForm = (key: any, value: any) => {
    console.log('hbdvjhjsdbvsdf', key, value);

    // console.log('inside Add', key, value);
    // console.log('intakeData', state, prettyFormat(dynamicForm));

    let intakeform = {...dynamicForm};
    let id: any;
    if (key === 'image' || key === 'date') {
      for (const iterator in intakeform) {
        let KeyMatch = key === 'image' ? 'image' : key === 'date' ? 'date' : '';

        console.log(
          'intake',
          intakeform[`${iterator}`]?.type,
          'keymatch',
          KeyMatch,
        );
        console.log('--------------------------');

        if (intakeform[`${iterator}`]?.type === KeyMatch) {
          id = String(intakeform[`${iterator}`].id);
          console.log('formiterate....', intakeform[`${iterator}`]);

          console.log('idd....', id);
        }
      }
    } else {
      id = String(key);
      console.log('elseId....', id);
    }

    if (id && dynamicForm[id]) {
      intakeform[id].value = value;
      console.log('updated.....', prettyFormat(intakeform[id].value));
      setintakeForm(intakeform);
    }
  };

  const validation = () => {
    Object.keys(dynamicForm).map(elem => {
      imageArray?.forEach((item: any) => {
        if (item?.id === elem) {
          convertImage(item?.id, item?.images);
        }
      });
    });

    let array: any = [];
    let form = Object.assign({}, intakeForm);
    let stateCopy = {...state};

    // console.log('intakeData', state, prettyFormat(form));
    Object.keys(dynamicForm).map(item => {
      // if (dynamicForm[item].is_required == 1) {
      array.push(item);
      // }
    });

    // console.log('intakeData', prettyFormat(array));

    let flag = true;

    array.map((item: any, key: any) => {
      if (
        dynamicForm[item].is_required == 1 &&
        dynamicForm[item].is_enabled == 1
      ) {
        console.log(
          'jhsdvbmhjzsdbvfd',
          Object.keys(form).some(index => index === item),
        );
        if (!Object.keys(form).some(index => index === item)) {
          stateCopy[item] = true;
          setState(stateCopy);
          flag = false;
        }
      } else {
        flag = true;
      }
    });
    Object.keys(form).forEach(item => {
      if (array.some((index: any) => index === item)) {
        if (dynamicForm[item].is_required == 1) {
          if (form[item]?.value == null || form[item]?.value === '') {
            console.log('shdvbmzhdbfmvhjdfvsfd', form[item]);
            stateCopy[item] = true;
            setState(stateCopy);
            showToast(
              `${form[item].label} field is missinng`,
              'Please fill the form first',
              false,
            );
            // setState({[item]: true});
            flag = false;
          } else {
            // setState({[item]: false});
            stateCopy[item] = false;
            setState(stateCopy);
          }
        } else {
          flag = true;
        }
      }
    });
    console.log('FALSE ', flag);
    if (flag) {
      // do something here.........
      console.log('true.....');
      submitIntakeForm();
    }
  };
  const submitIntakeForm = () => {
    // const myJSON = intakeForm;
    const myJSON = JSON.stringify(intakeForm);
    // console.log('jjjj...', myJSON);
    const params = {
      dispensary_id: item.id,
      filled_form_json: myJSON,
    };
    console.log('ii.ntake...', intakeForm);

    // const params = new FormData();
    // params.append('dispensary_id', item.id);
    // params.append('filled_form_json', myJSON);

    if (termsFlag) {
      console.log('terms found');
      let check: any;
      valueCB.forEach((item: any) => {
        if (item?.is_required == 1 && item?.selected === true) {
          check = true;
        } else {
          check = false;
        }
      });
      if (check) {
        submitIntakeToServe(params);
      } else {
        console.log('you have to accept terms');
        showToast(
          'Request Failed',
          'You have to accept terms and conditions',
          false,
        );
      }
    } else {
      console.log('no found');
      submitIntakeToServe(params);
    }
  };
  const submitIntakeToServe = async (params: any) => {
    setloading(true);
    console.log('params', params);
    await postIntakeForm(params)
      .then((res: any) => {
        console.log('fhdbvsdjfhvbsjdhfvsdf', res.data);

        if (res.data.status === true) {
          navigation.navigate('SuccessFormSubmit', {
            qrCode: QRcode,
            dispensary_id: item.id,
            lat: lat,
            lon: lon,
            dispensaryName: dispensaryName,
          });
        }
      })
      .catch((err: any) => {
        console.log('sndvczsgdhvczhsdvdf', err.response);

        showToast('Request Failed', err?.response.data?.message, false);
      })
      .finally(() => setloading(false));
  };
  React.useEffect(() => {
    gender?.length > 0 && ref.current?.show();
  }, [gender]);
  const onChangeSignature = (sign: any) => {
    addIntakeForm('singnature', String(sign));
  };
  const handleOnSelect = (
    value: any,
    data: any,
    index: any,
    isCheckSingle: any,
  ) => {
    // console.log('vhbdhfbvxdfv', data, value, index);
    setSelectedItem(value);
    setvaluIndex(index);
    console.log('checkbool', typeof isCheckSingle);

    if (Number(isCheckSingle)) {
      setSelpickerTitle((pre: any) => [{id: index, title: value}]);

      // test ......................
      // let cloneSelectState: any = [...selectState];

      // if (cloneSelectState.length > 0) {
      //   var foundIndex = cloneSelectState.findIndex((x: any) => x.id == data);
      //   console.log(foundIndex);
      //   if (foundIndex > -1) {
      //     cloneSelectState[foundIndex].title = value;
      //   } else {
      //     cloneSelectState.push({id: data, index: index, title: value});
      //   }
      // } else {
      //   cloneSelectState.push({id: data, index: index, title: value});
      // }
      // console.log('cloneState....', cloneSelectState);
      // setSelectState(cloneSelectState);

      // test ......................
    } else {
      console.log('multi');

      let clonePicker = [...SelpickerTitle];
      let checkInd = clonePicker.findIndex(ii => ii?.title === value);
      console.log('before', clonePicker);
      if (checkInd < 0) {
        clonePicker.push({id: index, title: value});
      } else {
        clonePicker.splice(checkInd, 1);
      }
      console.log('after', clonePicker);

      setSelpickerTitle(clonePicker);
    }
    // setSelpickerTitle((pre: any) => );
    // if (SelpickerTitle?.length > 1) {
    //   setSelpickerTitle(
    //     SelpickerTitle?.map((item: any,i:any) => {
    //       if (item?.id === index) {
    //         return {
    //           id: `${index}${i}`,
    //           title: value
    //         };
    //       }
    //       return item;
    //     })
    //   )
    // } else {
    //   setSelpickerTitle((pre: any) => [...pre, {id: index, title: value}]);
    // }

    setPickerTitle(value);
    setshowPicker(false);
    const temp = [];
    temp.push(value);
    addIntakeForm(data, temp);
  };
  const handleOnCategories = (
    value: any,
    data: any,
    index: any,
    isCheckSingle: any,
  ) => {
    // console.log('vhbdhfbvxdfv', data, value, index);
    setSelectedItem(value);
    setvaluIndex(index);
    console.log('checkbool', typeof isCheckSingle);

    if (Number(isCheckSingle)) {
      setCategories((pre: any) => [{id: index, title: value}]);
    } else {
      console.log('multi');

      let clonePicker = [...categores];
      let checkInd = clonePicker.findIndex(ii => ii?.title === value);
      console.log('before', clonePicker);
      if (checkInd < 0) {
        clonePicker.push({id: index, title: value});
      } else {
        clonePicker.splice(checkInd, 1);
      }
      console.log('after', clonePicker);

      setCategories(clonePicker);
    }
    console.log('response', value);

    // setCategories(value);
    setshowPicker(false);
    const temp = [];
    temp.push(value);
    addIntakeForm(data, temp);
  };
  const handleOnStrains = (
    value: any,
    data: any,
    index: any,
    isCheckSingle: any,
  ) => {
    // console.log('vhbdhfbvxdfv', data, value, index);
    setSelectedItem(value);
    setvaluIndex(index);
    console.log('checkbool', typeof isCheckSingle);

    if (Number(isCheckSingle)) {
      setStrains((pre: any) => [{id: index, title: value}]);
    } else {
      console.log('multi');

      let clonePicker = [...strains];
      let checkInd = clonePicker.findIndex(ii => ii?.title === value);
      console.log('before', clonePicker);
      if (checkInd < 0) {
        clonePicker.push({id: index, title: value});
      } else {
        clonePicker.splice(checkInd, 1);
      }
      console.log('after', clonePicker);

      setStrains(clonePicker);
    }

    // setPickerTitle(value);
    setshowPicker(false);
    const temp = [];
    temp.push(value);
    addIntakeForm(data, temp);
  };
  const handleOnBrands = (
    value: any,
    data: any,
    index: any,
    isCheckSingle: any,
  ) => {
    // console.log('vhbdhfbvxdfv', data, value, index);
    setSelectedItem(value);
    setvaluIndex(index);
    console.log('checkbool', typeof isCheckSingle);

    if (Number(isCheckSingle)) {
      setBrands((pre: any) => [{id: index, title: value}]);
    } else {
      console.log('multi');

      let clonePicker = [...brands];
      let checkInd = clonePicker.findIndex(ii => ii?.title === value);
      console.log('before', clonePicker);
      if (checkInd < 0) {
        clonePicker.push({id: index, title: value});
      } else {
        clonePicker.splice(checkInd, 1);
      }
      console.log('after', clonePicker);

      setBrands(clonePicker);
    }
    // setSelpickerTitle((pre: any) => );
    // if (SelpickerTitle?.length > 1) {
    //   setSelpickerTitle(
    //     SelpickerTitle?.map((item: any,i:any) => {
    //       if (item?.id === index) {
    //         return {
    //           id: `${index}${i}`,
    //           title: value
    //         };
    //       }
    //       return item;
    //     })
    //   )
    // } else {
    //   setSelpickerTitle((pre: any) => [...pre, {id: index, title: value}]);
    // }

    // setPickerTitle(value);
    setshowPicker(false);
    const temp = [];
    temp.push(value);
    addIntakeForm(data, temp);
  };
  const removeSelction = (index: number) => {
    let clonePicker = [...SelpickerTitle];
    clonePicker.splice(index, 1);
    setSelpickerTitle(clonePicker);
  };
  const removeCategories = (index: number) => {
    let clonePicker = [...categores];
    clonePicker.splice(index, 1);
    setCategories(clonePicker);
  };
  const removeBrands = (index: number) => {
    let clonePicker = [...brands];
    clonePicker.splice(index, 1);
    setBrands(clonePicker);
  };
  const removeStrains = (index: number) => {
    let clonePicker = [...strains];
    clonePicker.splice(index, 1);
    setStrains(clonePicker);
  };
  const handleOk = (value: any, data: any) => {
    addIntakeForm(data, value);
  };
  const hanldeScrollEnable = (value: any) => {
    setScrollEnabled(value);
  };
  const handleTerms = (data: any) => {
    let value = valueCB.map((item: any) => {
      if (item['id'] == data) {
        return {
          ...item,
          selected: !item?.selected,
        };
      } else return item;
    });
    console.log('dvbsmhdfbvsdf', value, data);
    setvalueCB(value);
    // valueCB
  };
  const handlePhoneNumber = (phone: any, data: any) => {
    addIntakeForm(data, phone);
  };

  const [indexPicker, setIndexPicker] = React.useState<number>(0);

  const renderEmail = (data: any) => {
    let type = dynamicForm[data].type;
    let isEnabled = dynamicForm[data].is_enabled;
    let isMandatory = dynamicForm[data].is_mandatory_field;
    let is_required = dynamicForm[data].is_required === '1';

    if (type === 'email' && isEnabled === '1' && isMandatory === '1') {
      return (
        <Input
          title={dynamicForm[data]?.label}
          onChangeText={(text: any) => addIntakeForm(data, text)}
          placeholder={dynamicForm[data]?.label}
          value={user?.email}
          editable={false}
          // error={state[data] ? 'Field required' : null}
        />
      );
    } else if (type === 'email' && isEnabled === '1') {
      return (
        <>
          <Input
            title={dynamicForm[data]?.label}
            onChangeText={(text: any) => addIntakeForm(data, text)}
            placeholder={dynamicForm[data]?.label}
            value={dynamicForm[data].value}
            editable={true}
            // error={state[data] ? 'Field required' : null}
          />
          {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] && is_required) {
              return <Text style={styles.errorText}>* Field required</Text>;
            }
          })}
        </>
      );
    }
  };

  const renderProfilePic = (data: any) => {
    let type = dynamicForm[data].type;
    let isEnabled = dynamicForm[data].is_enabled;
    let isMandatory = dynamicForm[data].is_mandatory_field;
    let is_required = dynamicForm[data].is_required === '1';

    if (type === 'image' && isMandatory === '1') {
      return (
        <>
          <CustomText
            style={{marginTop: RF(10), marginBottom: RF(5)}}
            color={gray}>
            {dynamicForm[data]?.label}
          </CustomText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <TouchableOpacity onPress={ImageUPload} style={styles.uploadButton}>
              <Camera name="upload" size={20} />
              <Text>Upload</Text>
            </TouchableOpacity> */}
            {/* {renderPhotos()} */}
            <Image
              source={{uri: user.image_path}}
              style={{height: RF(60), width: RF(60), borderRadius: RF(5)}}
            />
          </View>
          {/* {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] == true) {
              return <Text style={styles.errorText}>* Image required</Text>;
            }
          })} */}
        </>
      );
    } else if (type === 'image') {
      return (
        <>
          <CustomText
            style={{marginTop: RF(10), marginBottom: RF(5)}}
            color={gray}>
            {dynamicForm[data]?.label}
          </CustomText>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => ImageUPload(data)}
              style={styles.uploadButton}>
              <Camera name="upload" size={20} />
              <Text>Upload</Text>
            </TouchableOpacity>
            <FlatList
              data={
                imageArray?.filter((item: any) => item.id == data)[0]?.images
              }
              horizontal
              keyExtractor={(item, index) => item + index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View style={[styles.uploadCont]}>
                    <TouchableOpacity
                      style={styles.close}
                      onPress={() => delImage(data, item, index)}>
                      <Camera name="close" color="white" size={20} />
                    </TouchableOpacity>
                    <View style={styles.uploadItem}>
                      <Image
                        source={{uri: item.uri}}
                        style={{
                          height: RF(60),
                          width: RF(60),
                          borderRadius: RF(5),
                        }}
                      />
                    </View>
                  </View>
                );
              }}
            />
            {/* {renderPhotos(data)} */}
            {/* imageArray */}
          </View>
          {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] == true) {
              return <Text style={styles.errorText}>* Image required</Text>;
            }
          })}
        </>
      );
    }
  };

  const renderText = (data: any) => {
    let type = dynamicForm[data].type;
    let is_required = dynamicForm[data].is_required === '1';

    // let isEnabled = dynamicForm[data].is_enabled;
    let can_not_delete = dynamicForm[data].can_not_delete;

    if (type === 'text' && can_not_delete === '1') {
      return (
        <>
          <Input
            title={dynamicForm[data]?.label}
            onChangeText={(text: any) => addIntakeForm(data, text)}
            placeholder={dynamicForm[data]?.label}
            value={dynamicForm[data].value}
            editable={true}

            // error={state[data] ? 'Field required' : null}
          />

          {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] == true && is_required) {
              return <Text style={styles.errorText}>* Field required</Text>;
            }
          })}
        </>
      );
    } else if (type === 'text') {
      return (
        <>
          <Input
            title={dynamicForm[data]?.label}
            onChangeText={(text: any) => addIntakeForm(data, text)}
            placeholder={dynamicForm[data]?.label}
            value={dynamicForm[data].value}
            editable={true}
            // error={state[data] ? 'Field required' : null}
          />

          {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] == true && is_required) {
              return <Text style={styles.errorText}>* Field required</Text>;
            }
          })}
        </>
      );
    } else if (type === 'textarea') {
      return (
        <>
          <Input
            multiline={true}
            numberOfLines={10}
            style={{
              height: 150,
              textAlignVertical: 'top',
              width: '100%',
            }}
            title={dynamicForm[data]?.label}
            onChangeText={(text: any) => addIntakeForm(data, text)}
            placeholder={dynamicForm[data]?.label}
            value={dynamicForm[data].value}
            editable={true}
          />
          {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] && is_required) {
              return <Text style={styles.errorText}>* Field required</Text>;
            }
          })}
        </>
      );
    }
  };

  const renderPhone = (data: any) => {
    console.log('jshjdbvchdzsvdfvd', dynamicForm[data]);

    let type = dynamicForm[data].type;
    let is_required = dynamicForm[data].is_required === '1';
    let isMandatory = dynamicForm[data].is_mandatory_field;

    // let isEnabled = dynamicForm[data].is_enabled;
    // let can_not_delete = dynamicForm[data].can_not_delete;
    if (type === 'phone' && isMandatory === '1') {
      return (
        <>
          <Input
            title={dynamicForm[data]?.label}
            // onChangeText={(text: any) => addIntakeForm(data, text)}
            placeholder={dynamicForm[data]?.label}
            value={user?.phone_number}
            editable={false}
            // error={state[data] ? 'Field required' : null}
          />
          {/* {Object.keys(state).map((key: any, index) => {
            if (key == data && state[key] == true && (isMandatory === "1")) {
              return <Text style={styles.errorText}>* Field required</Text>;
            }
          })} */}
        </>
      );
    } else if (type === 'phone') {
      return (
        <>
          <Input
            title={dynamicForm[data]?.label}
            onChangeText={(text: any) => {
              setPhonenumber(text);
              addIntakeForm(data, text);
            }}
            keyboardType={'numeric'}
            placeholder={dynamicForm[data]?.label}
            value={dynamicForm[data]?.value}
            editable={!(dynamicForm[data]?.is_mandatory_field === '1')}
            // error={state[data] ? 'Field required' : null}
          />
          {/* {  Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true && is_required) {
                            return (
                              <Text style={styles.errorText}>
                                * Field required
                              </Text>
                            );
                          }
                        })} */}
        </>
      );
    }
  };

  return (
    <>
      <HeaderWrapper
        showBtnLeft
        showTitle
        title="Fill Intake form"
        showBtnRight
      />
      <View style={{flex: 1}}>
        <KeyboardAwareScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}>
          {dynamicForm &&
            Object.keys(dynamicForm).map((data: any, index) => {
              return (
                <View>
                  {dynamicForm[data]?.type == 'name' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          value={user?.name}
                          placeholder={dynamicForm[data]?.label}
                          editable={!Number(dynamicForm[data]?.can_not_delete)}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}
                  {dynamicForm[data]?.type == 'middle_name' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          value={user?.middle_name}
                          placeholder={dynamicForm[data]?.label}
                          editable={!Number(dynamicForm[data]?.can_not_delete)}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}
                  {dynamicForm[data]?.type == 'last_name' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={user?.last_name}
                          editable={!Number(dynamicForm[data]?.can_not_delete)}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}
                  {renderEmail(data)}
                  {/* {dynamicForm[data]?.type == 'email' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={user?.email}
                          editable={!Number(dynamicForm[data]?.can_not_delete)}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )} */}

                  {dynamicForm[data]?.type == 'date_of_birth' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={moment(user?.date_of_birth).format(
                            'DD MMM YYYY',
                          )}
                          editable={!Number(dynamicForm[data]?.can_not_delete)}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}

                  {renderPhone(data)}

                  {/* {dynamicForm[data]?.type == 'phone' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={user?.phone_number}
                          editable={!dynamicForm[data]?.is_required === "1" }
                          // error={state[data] ? 'Field required' : null}
                        />
                        {(dynamicForm[data]?.is_required === "1") && Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>
                                * Field required
                              </Text>
                            );
                          }
                        })}
                      </>
                    )} */}
                  {dynamicForm[data]?.type == 'address' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={user?.address}
                          editable={false}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}
                  {dynamicForm[data]?.type == 'gender' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                          value={user?.gender}
                          editable={false}
                          // error={state[data] ? 'Field required' : null}
                        />
                      </>
                    )}
                  {/* {((dynamicForm[data]?.type == 'text' &&
                    dynamicForm[data]?.is_enabled == 1) ||
                    (dynamicForm[data]?.type == 'email' &&
                      dynamicForm[data]?.is_enabled == 1)) && (
                    <>
                      <Input
                        title={dynamicForm[data]?.label}
                        onChangeText={(text: any) => addIntakeForm(data, text)}
                        placeholder={dynamicForm[data]?.label}
                        value={user.email}

                        // error={state[data] ? 'Field required' : null}
                      />

                      {Object.keys(state).map((key: any, index) => {
                        if (key == data && state[key] == true) {
                          return (
                            <Text style={styles.errorText}>
                              * Field required
                            </Text>
                          );
                        }
                      })}
                    </>
                  )} */}
                  {renderText(data)}
                  {/* {dynamicForm[data]?.type == 'textarea' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Input
                          multiline={true}
                          numberOfLines={10}
                          style={{
                            height: 150,
                            textAlignVertical: 'top',
                            width: '100%',
                          }}
                          title={dynamicForm[data]?.label}
                          onChangeText={(text: any) =>
                            addIntakeForm(data, text)
                          }
                          placeholder={dynamicForm[data]?.label}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>
                                * Field required
                              </Text>
                            );
                          }
                        })}
                      </>
                    )} */}
                  {dynamicForm[data]?.type == 'date' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <Section
                          title={dynamicForm[data]?.label}
                          placeholder={dynamicForm[data]?.label}
                          onPressIn={() => {
                            setdatetype(String(data));
                            setOpen(true);
                          }}
                          value={dynamicForm[data]?.value}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>
                                * Field required
                              </Text>
                            );
                          }
                        })}
                      </>
                    )}
                  {/* {dynamicForm[data]?.type == 'image' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <CustomText
                          style={{marginTop: RF(10), marginBottom: RF(5)}}
                          color={gray}>
                          {dynamicForm[data]?.label}
                        </CustomText>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={ImageUPload}
                            style={styles.uploadButton}>
                            <Camera name="upload" size={20} />
                            <Text>Upload</Text>
                          </TouchableOpacity>
                          {renderPhotos()}
                        </View>
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>
                                * Image required
                              </Text>
                            );
                          }
                        })}
                      </>
                    )} */}
                  {renderProfilePic(data)}

                  {dynamicForm[data]?.type == 'notice' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <CustomText
                          style={{marginTop: RF(10), marginBottom: RF(5)}}
                          color={gray}>
                          {dynamicForm[data]?.label}
                        </CustomText>
                        <CustomText
                          style={{marginTop: RF(10), marginBottom: RF(5)}}
                          color={gray}>
                          {dynamicForm[data]?.value}
                        </CustomText>
                      </>
                    )}

                  {dynamicForm[data]?.type == 'singnature' &&
                    showSignature &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <View>
                        <CustomText
                          style={{marginTop: RF(10), marginBottom: RF(5)}}
                          color={gray}>
                          {dynamicForm[data]?.label}
                        </CustomText>
                        <Sign
                          text={'Signature'}
                          onOK={signature => handleOk(signature, data)}
                          handleScroll={hanldeScrollEnable}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>
                                * Field required
                              </Text>
                            );
                          }
                        })}
                      </View>
                    )}

                  {dynamicForm[data]?.type == 'select2' &&
                    dynamicForm[data]?.is_enabled == 1 &&
                    Array.isArray(dynamicForm[data]?.options) && (
                      <>
                        <DropDownInput
                          type={dynamicForm[data]?.is_single_select}
                          selectedRemove={removeSelction}
                          HeadingTitle={dynamicForm[data]?.label}
                          list={
                            dynamicForm[data]?.options &&
                            dynamicForm[data]?.options !== 'false'
                              ? dynamicForm[data]?.options
                              : []
                          }
                          title={dynamicForm[data]?.value}
                          showPicker={
                            showPicker && indexPicker === index + 1
                              ? true
                              : false
                          }
                          onPressPicker={() => {
                            setIndexPicker(index + 1);

                            setshowPicker(!showPicker);
                          }}
                          onSelect={(item: any) => {
                            handleOnSelect(
                              item,
                              data,
                              index + 1,
                              dynamicForm[data]?.is_single_select,
                            );
                          }}
                          // key={1}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>* Select one</Text>
                            );
                          }
                        })}
                      </>
                    )}

                  {dynamicForm[data]?.type == 'categories' &&
                    dynamicForm[data]?.is_enabled == 1 &&
                    Array.isArray(dynamicForm[data]?.options) && (
                      <>
                        <DropDownInput
                          type={dynamicForm[data]?.is_single_select}
                          selectedRemove={removeCategories}
                          HeadingTitle={dynamicForm[data]?.label}
                          list={
                            dynamicForm[data]?.options &&
                            dynamicForm[data]?.options !== 'false'
                              ? dynamicForm[data]?.options
                              : []
                          }
                          title={
                            Number(dynamicForm[data]?.is_single_select)
                              ? categores[0]?.title
                              : categores || ''
                          }
                          showPicker={
                            showPicker && indexPicker === index + 1
                              ? true
                              : false
                          }
                          onPressPicker={() => {
                            setIndexPicker(index + 1);

                            setshowPicker(!showPicker);
                          }}
                          onSelect={(item: any) => {
                            handleOnCategories(
                              item,
                              data,
                              index + 1,
                              dynamicForm[data]?.is_single_select,
                            );
                          }}
                          // key={1}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>* Select one</Text>
                            );
                          }
                        })}
                      </>
                    )}
                  {dynamicForm[data]?.type == 'strains' &&
                    dynamicForm[data]?.is_enabled == 1 &&
                    Array.isArray(dynamicForm[data]?.options) && (
                      <>
                        <DropDownInput
                          type={dynamicForm[data]?.is_single_select}
                          selectedRemove={removeStrains}
                          HeadingTitle={dynamicForm[data]?.label}
                          list={
                            dynamicForm[data]?.options &&
                            dynamicForm[data]?.options !== 'false'
                              ? dynamicForm[data]?.options
                              : []
                          }
                          title={
                            Number(dynamicForm[data]?.is_single_select)
                              ? strains[0]?.title
                              : strains || ''
                          }
                          showPicker={
                            showPicker && indexPicker === index + 1
                              ? true
                              : false
                          }
                          onPressPicker={() => {
                            setIndexPicker(index + 1);

                            setshowPicker(!showPicker);
                          }}
                          onSelect={(item: any) => {
                            handleOnStrains(
                              item,
                              data,
                              index + 1,
                              dynamicForm[data]?.is_single_select,
                            );
                          }}
                          // key={1}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>* Select one</Text>
                            );
                          }
                        })}
                      </>
                    )}
                  {console.log(
                    'bvhdf vxdfvhxdfbv',
                    dynamicForm[data]?.type == 'brands' &&
                      dynamicForm[data]?.is_enabled == 1 &&
                      Array.isArray(dynamicForm[data]?.options),
                  )}
                  {dynamicForm[data]?.type == 'brands' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <DropDownInput
                          type={dynamicForm[data]?.is_single_select}
                          selectedRemove={removeBrands}
                          HeadingTitle={dynamicForm[data]?.label}
                          list={
                            dynamicForm[data]?.options &&
                            dynamicForm[data]?.options !== 'false'
                              ? dynamicForm[data]?.options
                              : []
                          }
                          title={dynamicForm[data]?.value}
                          showPicker={
                            showPicker && indexPicker === index + 1
                              ? true
                              : false
                          }
                          onPressPicker={() => {
                            setIndexPicker(index + 1);

                            setshowPicker(!showPicker);
                          }}
                          onSelect={(item: any) => {
                            handleOnBrands(
                              item,
                              data,
                              index + 1,
                              dynamicForm[data]?.is_single_select,
                            );
                          }}
                          // key={1}
                        />
                        {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return (
                              <Text style={styles.errorText}>* Select one</Text>
                            );
                          }
                        })}
                      </>
                    )}

                  {dynamicForm[data]?.type == 'terms' &&
                    dynamicForm[data]?.is_enabled == 1 && (
                      <>
                        <CustomText style={{marginTop: RF(10)}} color={gray}>
                          {dynamicForm[data]?.label}
                        </CustomText>

                        <View style={styles.mainMiniView}>
                          <CustomCB
                            value={
                              valueCB.filter((item: any) => item?.id == data)[0]
                                ?.selected
                            }
                            onPress={() => handleTerms(data)}
                            style={{paddingHorizontal: 0, marginLeft: 0}}
                          />
                          <View style={{width: '85%'}}>
                            <CustomText size={12}>
                              {dynamicForm[data]?.value}
                              {/* <CustomText
                          style={styles.priText}
                          size={12}
                          color={primary}>
                          that a reader{' '}
                        </CustomText> */}
                            </CustomText>
                            {/* <CustomText size={12}>
                        distracted by the{' '}
                        <CustomText
                          style={styles.priText}
                          size={12}
                          color={primary}>
                          readable{' '}
                        </CustomText>
                        content of a layout
                      </CustomText> */}
                          </View>
                        </View>
                        {/* {Object.keys(state).map((key: any, index) => {
                          if (key == data && state[key] == true) {
                            return <Text>Required</Text>;
                          }
                        })} */}
                      </>
                    )}
                </View>
              );
            })}

          <View style={styles.btnView}>
            <Button text="Submit Form" onPress={validation} />
          </View>
          {open && (
            <DateOfBirth
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setInput(moment(date).format('YYYY-MM-DD'));
                addIntakeForm(
                  datetype,
                  String(moment(date).format('YYYY-MM-DD')),
                );
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          )}

          {ref && (
            <ActionSheet
              headerAlwaysVisible
              closeOnPressBack
              closeOnTouchBackdrop
              ref={ref}
              containerStyle={styles.actionsheet}>
              <Pressable
                onPress={() => ref.current?.hide()}
                style={styles.actionSheetView}>
                <Pressable
                  onPress={cameraImageHandler}
                  style={styles.miniAccView}>
                  <Camera
                    name="camera"
                    size={20}
                    color={THEME.colors.primary}
                  />
                  <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                    Open Camera
                  </Text>
                </Pressable>
                <Pressable
                  onPress={galleryImageHandler}
                  style={styles.miniAccView}>
                  <Icon name="images" size={20} color={THEME.colors.primary} />
                  <Text style={{fontSize: RF(14), color: THEME.colors.gray}}>
                    Open Gallery
                  </Text>
                </Pressable>
              </Pressable>
            </ActionSheet>
          )}

          <LoadingOverlay loading={loading} />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const CusSignature = ({title, onChangeSignature}: any) => {
  const _signaturePadError = ({error}: any) => {
    console.log('erorr....', error);
  };
  const _signaturePadChange = ({base64DataUrl}: any) => {
    onChangeSignature(base64DataUrl);
  };
  return (
    <>
      <CustomText style={GST.mt10} color={gray}>
        {title}
      </CustomText>
      <View style={styles.padView}>
        <SignaturePad
          onError={_signaturePadError}
          onChange={_signaturePadChange}
          style={[GST.flex, GST.BC]}
        />
      </View>
    </>
  );
};

const Section = ({
  title,
  placeholder,
  value,
  keyboardType,
  onPressIn,
  onChangeText,
}: any) => {
  return (
    <>
      <CustomText style={GST.mt10} color={gray}>
        {title}
      </CustomText>
      <Pressable onPress={onPressIn}>
        <TextInput
          editable={false}
          onPressIn={onPressIn}
          placeholderTextColor={gray}
          style={styles.text}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </Pressable>
    </>
  );
};

const DateOfBirth = ({
  open,
  date,
  onCancel,
  onConfirm,
}: {
  open?: boolean;
  date?: any;
  onCancel?: () => any;
  onConfirm?: (data: any) => any;
}) => {
  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={date}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
};

export default IntakeForm;
