import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
//import { useTheme } from '@material-ui/core/styles';
import {
    modelName,
    validationSchema
} from '../messages/schema';
import Form from '../../__components/helpers/FormikNew';

//import FieldSubmitButton from '../../__components/fields/FieldSubmitButton';
//import FieldText from '../../__components/fields/FieldText';
import FieldTextWithSubmit from '../../__components/fields/FieldTextWithSubmit';

import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';
import {
    //CreateComponent,
    //ItemsComponent
} from '../../__components/itemsComponent';
import {
    //LikesButton,
    //LikesCountComponent,
} from '../../__components/estimeComponent';
import {
    //CreateFab as CreateView,
    //CreateButton as CreateView,
    //CreateInline as CreateView,
} from '../../__views/CreateView';
import {
    //Table as ItemsView,
    //Grid as ItemsView,
    //Grid12 as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';


const Item = ({ item, add, setActive }) => {

    //const theme = useTheme();

    const { user } = useContext(AuthContext);
    item.userId = user?.id;

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldTextWithSubmit
                    modelName={modelName}
                    name={'text'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                    onSubmit={props.handleSubmit} // for FieldTextWithSubmit
                />
            ]
            }
        />
        }
    </Form>
};

export default Item;