import {StyleSheet} from 'react-native';

const primaryColor = '#9fbb32';
const secondaryColor = '#001d7e';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
  },
  logoLabel: {
    width: '60%',
    resizeMode: 'contain',
    marginBottom: -100,
  },
  logoDraw: {
    width: '30%',
    resizeMode: 'contain',
  },
  controlContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  control: {
    backgroundColor: primaryColor,
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
  },
  btnContainer: {
    width: 126,
    height: 126,
    backgroundColor: secondaryColor,
    borderRadius: 63,
    alignItems: 'center',
  },
  btnStop: {
    marginTop: 8,
  },
  btnPlay: {
    marginTop: 6,
  },
  loader: {
    marginTop: 43,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewModal: {
    marginTop: 22,
    backgroundColor: '#fff',
    padding: 15,
    borderTopColor: primaryColor,
    borderTopWidth: 5,
  },
  textFecharModal: {
    fontSize: 18,
    alignSelf: 'flex-end',
    marginRight: 20,
    color: primaryColor,
  },
  textModal: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  textModalCredit: {
    fontSize: 14,
    alignSelf: 'center',
  },
  divider: {
    borderColor: '#DDD',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 25,
    marginRight: 25,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
