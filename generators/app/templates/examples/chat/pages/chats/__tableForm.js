import { modelName } from './schema';

const tableFields = (theme) => {
    return [
        {
            name: "id",
            label: theme.props.models[modelName].Id,
            options: {
                filter: false,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'name',
            label: theme.props.models[modelName].name,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
                //customBodyRender: (value) => value?.id
            }
        },
        
    ]
}

export default tableFields;