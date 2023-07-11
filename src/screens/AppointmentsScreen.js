import React, { useEffect, useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchDataFromUrl } from '../reducers';
import { List } from 'react-native-paper';

function ServicesScreen({ navigation, fetchData, appointments }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Appointments',
        });
    }, []);

    useEffect(() => {
        fetchData("appointments")
    }, [])

    
    return (
        <List.Section>
            <List.Subheader>Your appointments</List.Subheader>
            {
                [...appointments].map((appointment) => (
                    <List.Item
                    key={appointment?.id}
                    title={appointment?.title}
                    description={appointment?.description}
                    left={(props) => <List.Icon {...props} icon="calendar-today" />}
                    onPress={() => {
                        navigation.navigate("AppointmentInputScreen", {
                                appointmentId: appointment.id
                            })
                        }}
                    />))
            }
        </List.Section>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        appointments: state.appointments,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => {
            dispatch(fetchDataFromUrl(url))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);
