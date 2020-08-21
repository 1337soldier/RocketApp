import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'

FeatherIcon.loadFont()
AntDesignIcon.loadFont();

import icoMoonConfig from './selection.json';

const CustomIcon = createIconSetFromIcoMoon(
	icoMoonConfig,
	'custom',
	'custom.ttf'
);

export { CustomIcon, FeatherIcon, AntDesignIcon };
