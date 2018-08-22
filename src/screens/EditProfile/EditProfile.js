// /* global require */

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Image,
//   ScrollView,
//   TouchableHighlight
// } from 'react-native';
// import PropTypes from 'prop-types';

// import Button from '../../components/Button';
// import Chips from '../../components/Chips/';
// // import collabActive from "../../assets/icons/workstyle/collaborative/active.png";
// // import collabInactive from "../../assets/icons/workstyle/collaborative/inactive.png";
// // import indepActive from "../../assets/icons/workstyle/independent/active.png";
// // import indepInactive from "../../assets/icons/workstyle/independent/inactive.png";
// // import eitherActive from "../../assets/icons/workstyle/either/active.png";
// // import eitherInactive from "../../assets/icons/workstyle/either/inactive.png";

// // Styles
// import { colors } from '../../config/styles';
// import { styles } from './styles';

// const EditProfile = ({
//   user,
//   updateProfilePhoto,
//   updateFullname,
//   updateProgram,
//   updateSchoolName,
//   updateAboutMe,
//   setChips,
//   submit,
//   updateWorkstyle
// }) => (
//   <ScrollView contentContainerStyle={styles.mainContainer}>
//     <TouchableOpacity
//       onPress={updateProfilePhoto}
//       label={'Select an Image'}
//       style={styles.profilePhotoButton}
//     >
//       {user.profilePhoto ? (
//         <Image
//           style={styles.profilePhoto}
//           source={{ uri: user.profilePhoto }}
//         />
//       ) : (
//         <View>
//           <Image
//             style={styles.profileIcon}
//             source={require('../../assets/icons/tab-bar-icons/profile/grey.png')}
//           />

//           <Text style={styles.profileCircleText}>
//             Edit
//             <Image
//               style={styles.profileEditIcon}
//               resizeMode="contain"
//               source={require('../../assets/icons/navigation/edit.png')}
//             />
//           </Text>
//         </View>
//       )}
//     </TouchableOpacity>
//     <View>
//       <TextInput
//         value={user.fullname}
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={text => updateFullname(text)}
//         placeholder="Fullname"
//       />
//       <TextInput
//         value={user.program}
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={updateProgram}
//         placeholder="Program or Field of Study"
//       />
//       <TextInput
//         value={user.schoolName}
//         autoCorrect={false}
//         style={styles.textInput}
//         onChangeText={updateSchoolName}
//         placeholder="School Name"
//       />
//     </View>
//     <View>
//       <Text style={styles.heading}>
//         <Text style={styles.screenText}>
//           {'Workstyle (Select One)'.toUpperCase()}
//         </Text>
//       </Text>
//       <View style={styles.workstyle}>
//         <TouchableHighlight
//           underlayColor={colors.borealisGreen}
//           activeOpacity={1}
//           onPress={() => {
//             updateWorkstyle('collaborative');
//           }}
//         >
//           <View style={styles.workstyleIcons}>
//             <Image
//               style={styles.icons}
//               source={
//                 user.workstyle === 'collaborative'
//                   ? collabActive
//                   : collabInactive
//               }
//             />
//             <Text style={styles.workstyleText}>Collaborative</Text>
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor={colors.coralOrange}
//           activeOpacity={1}
//           onPress={() => {
//             updateWorkstyle('independent');
//           }}
//         >
//           <View style={styles.workstyleIcons}>
//             <Image
//               style={styles.icons}
//               source={
//                 user.workstyle === 'independent' ? indepActive : indepInactive
//               }
//             />
//             <Text style={styles.workstyleText}>Independent</Text>
//           </View>
//         </TouchableHighlight>
//         <TouchableHighlight
//           underlayColor={colors.dandelionYellow}
//           activeOpacity={1}
//           onPress={() => {
//             updateWorkstyle('either');
//           }}
//         >
//           <View style={styles.workstyleIcons}>
//             <Image
//               style={styles.icons}
//               source={
//                 user.workstyle === 'either' ? eitherActive : eitherInactive
//               }
//             />
//             <Text style={styles.workstyleText}>Either</Text>
//           </View>
//         </TouchableHighlight>
//       </View>
//       <View style={styles.heading}>
//         <Text style={styles.screenText}>{'About Me'.toUpperCase()}</Text>
//         <TextInput
//           value={user.aboutMe}
//           multiline={true}
//           style={styles.largeInput}
//           onChangeText={updateAboutMe}
//           placeholder="0/250"
//         />
//       </View>
//       <View style={styles.heading}>
//         <Text style={styles.screenText}>{'Skills'.toUpperCase()}</Text>
//         <View style={styles.largeInputChips}>
//           <Chips
//             chips={user.chips}
//             setChips={setChips}
//             placeholder="Add a tag..."
//           />
//         </View>
//       </View>
//     </View>
//     <Button
//       width={200}
//       color={colors.cornflowerBlue}
//       text={'Save'}
//       func={submit}
//     />
//   </ScrollView>
// );

// EditProfile.propTypes = {
//   user: PropTypes.object.isRequired,
//   updateProfilePhoto: PropTypes.func.isRequired,
//   profilePhoto: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
//   updateFullname: PropTypes.func.isRequired,
//   updateProgram: PropTypes.func.isRequired,
//   updateSchoolName: PropTypes.func.isRequired,
//   updateAboutMe: PropTypes.func.isRequired,
//   submit: PropTypes.func.isRequired,
//   updateWorkstyle: PropTypes.func.isRequired,
//   setChips: PropTypes.func.isRequired
// };

// EditProfile.defaultProps = {
//   chips: []
// };

// export default EditProfile;
