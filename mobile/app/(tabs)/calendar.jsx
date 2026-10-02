import { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [note, setNote] = useState('');
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setNote(events[day.dateString]?.note || '');
    setShowModal(true);
  };

  const saveNote = () => {
    setEvents((prev) => ({
      ...prev,
      [selectedDate]: {
        selected: true,
        selectedColor: '#2563eb',
        note,
      },
    }));
    setShowModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...events,
          ...(selectedDate && {
            [selectedDate]: {
              ...(events[selectedDate] || {}),
              selected: true,
              selectedColor: '#2563eb',
            },
          }),
        }}
      />

      <View style={{ padding: 16 }}>
        {selectedDate ? (
          <>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Note for {selectedDate}
            </Text>

            <Text style={{ marginTop: 8, color: '#555' }}>
              {events[selectedDate]?.note || 'No note for this date.'}
            </Text>

            <Pressable
              onPress={() => {
                setNote(events[selectedDate]?.note || '');
                setShowModal(true);
              }}
              style={{
                marginTop: 12,
                alignSelf: 'flex-start',
                backgroundColor: '#2563eb',
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: 'white' }}>
                {events[selectedDate] ? 'Edit Note' : 'Add Note'}
              </Text>
            </Pressable>
          </>
        ) : (
          <Text style={{ color: '#888' }}>
            Select a date to see the note.
          </Text>
        )}
      </View>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)'
        }}>
          <View style={{
            backgroundColor: 'white',
            margin: 20,
            padding: 20,
            borderRadius: 12
          }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
              Edit Note
            </Text>

            <TextInput
              value={note}
              onChangeText={setNote}
              placeholder="Write your note..."
              multiline
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 8,
                padding: 10,
                marginTop: 10,
                minHeight: 80
              }}
            />

            <Pressable
              onPress={saveNote}
              style={{
                marginTop: 15,
                backgroundColor: '#2563eb',
                padding: 12,
                borderRadius: 8
              }}
            >
              <Text style={{ color: 'white', textAlign: 'center' }}>
                Save
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
