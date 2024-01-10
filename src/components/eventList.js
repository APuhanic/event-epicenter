import React from 'react';
import Event from "@/components/event";


export default function EventList({events, onEventClick}){
    return events.map((event) => (
        <Event key={event.id} event={event} onEventClick={onEventClick} />
    ));
}