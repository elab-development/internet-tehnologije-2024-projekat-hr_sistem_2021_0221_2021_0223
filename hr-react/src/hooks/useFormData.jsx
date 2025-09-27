import React from 'react';
const useFormData = (initialState) => {

    const [formData, setFormData] = React.useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    return {formData, handleChange};
}

export default useFormData;
