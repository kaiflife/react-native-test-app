import React from 'react';
import { View } from 'react-native';

const Navigator = ({route, screens}) => {
    const filteredComponents = screens.filter(screen => route === screen.route && !screen.options.hide);
    const components = filteredComponents.map(screen => {
        const Component = screen.component;
        return <Component params={screen.params} />;
    })
    return (<View>{components}</View>);
}

export default Navigator;