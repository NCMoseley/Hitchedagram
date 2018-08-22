// import React, { Component } from 'react';
// import { View } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import {
//   setFullName,
//   setProgram,
//   setSchoolName,
//   setAboutMe,
//   setWorkstyle,
//   setProfilePhoto,
//   getUserError
// } from '../../redux/modules/user';

// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

// import EditProfile from './EditProfile';
// // import Loading from "../../components/Loading/";

// import { updateProfileOnEdit, setChips } from '../../redux/modules/user';

// import { headerBarStyle } from '../../config/styles';
// import { styles } from './styles';

// class EditProfileContainer extends Component {
//   static propTypes = {
//     navigation: PropTypes.object.isRequired
//   };
//   static navigationOptions = ({ navigation }) => ({
//     title: 'EDIT PROFILE',
//     ...headerBarStyle(navigation, true)
//   });

//   updateFullname = fullName => {
//     this.props.dispatch(setFullName(fullName));
//   };

//   updateSchoolName = schoolName => {
//     this.props.dispatch(setSchoolName(schoolName));
//   };

//   updateProgram = program => {
//     this.props.dispatch(setProgram(program));
//   };

//   updateWorkstyle = workstyle => {
//     this.props.dispatch(setWorkstyle(workstyle));
//   };

//   updateChips = chips => {
//     this.props.dispatch(setChips(chips));
//   };

//   updateProfilePhoto = profilePhoto => {
//     this.props.dispatch(setProfilePhoto(profilePhoto));
//   };

//   updateAboutMe = aboutMe => {
//     this.props.dispatch(setAboutMe(aboutMe));
//   };

//   updateProfilePhoto = () => {
//     const options = {
//       title: 'Select Photo',
//       allowsEditing: true,
//       maxHeight: 400,
//       maxWidth: 400,
//       cameraType: 'front'
//     };
//     ImagePicker.showImagePicker(options, response => {
//       if (response.error) {
//         this.props.dispatch(getUserError(response.error));
//       } else {
//         const source = `data:image/jpeg;base64,${response.data}`;
//         this.props.dispatch(setProfilePhoto(source));
//       }
//     });
//   };

//   submit = async () => {
//     this.props.dispatch(
//       updateProfileOnEdit({
//         fullname: this.props.user.fullname,
//         program: this.props.user.program,
//         schoolName: this.props.user.schoolName,
//         aboutMe: this.props.user.aboutMe,
//         workstyle: this.props.user.workstyle,
//         profilePhoto: this.props.user.profilePhoto,
//         chips: this.props.user.chips
//       })
//     );
//     this.props.navigation.goBack();
//   };

//   render() {
//     return (
//       <View style={styles.background}>
//         {this.props.isLoading ? (
//           <Loading />
//         ) : (
//           <EditProfile
//             user={this.props.user}
//             setChips={this.updateChips}
//             updateChips={this.updateChips}
//             updateWorkstyle={this.updateWorkstyle}
//             updateProfilePhoto={this.updateProfilePhoto}
//             updateFullname={this.updateFullname}
//             updateProgram={this.updateProgram}
//             updateAboutMe={this.updateAboutMe}
//             updateSchoolName={this.updateSchoolName}
//             submit={this.submit}
//           />
//         )}
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   isLoading: state.user.isLoading,
//   user: state.user.userForm,
//   competitions: state.competition.competitions
// });

// EditProfileContainer.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired,
//   isLoading: PropTypes.bool.isRequired
// };

// export default connect(mapStateToProps)(EditProfileContainer);
