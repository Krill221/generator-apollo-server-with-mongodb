import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import {
    modelName,
    validationSchema
} from '../orderitems/schema';
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
    //Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';
import { CardHeader, Typography } from '@material-ui/core';

const Item = ({ item, isNew, update, setActive }) => {

    //const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <CardHeader
                    title={item.productId.name}
                    subheader={item.productId.desc}
                />,
                <FieldText
                    modelName={modelName}
                    name={'value'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <Typography>${item.productId.price * item.value}</Typography>,

            ]
            }
        />
        }
    </Form>
};

export default Item;