import {StyleSheet} from 'react-native';

const primaryColor = '#9fbb32';

const styles = StyleSheet.create({
  btnPlay: {
    marginTop: 6,
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
  imgIcon: {
    width: 18,
    height: 18,
  },
});

export default styles;
