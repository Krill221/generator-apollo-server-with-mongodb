import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import {
    modelName,
    validationSchema
} from '../orders/schema';
import Form from '../../__components/helpers/FormikEdit';
import FieldText from '../../__components/fields/FieldText';
//import FieldTextWithSubmit from '../../__components/fields/FieldTextWithSubmit';

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
    //Chat as ItemsView,
    //Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemChat as ItemView,
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';

const Item = ({ item, isNew, update, setActive }) => {

    //const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <FieldText
                    modelName={modelName}
                    name={'address'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                
            ]
            }
        />
        }
    </Form>
};

export default Item;