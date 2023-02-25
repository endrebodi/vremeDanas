import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import WeatherChart from './components/WeatherChart';

export default function App() {
  const cities = [
    'Banatski_Karlovac',
    'Beograd-Surcin',
    'Becej',
    'Beograd_Vracar',
    'Crni_Vrh',
    'Cuprija',
    'Dimitrovgrad',
    'Kikinda',
    'Kopaonik',
    'Kragujevac',
    'Kraljevo',
    'Krusevac',
    'Kursumlija',
    'Leskovac',
    'Loznica',
    'Negotin',
    'Nis_Tvrdjava',
    'Novi_Sad_Rimski_Sancevi',
    'Palic',
    'Pozega',
    'Sjenica',
    'Smederevska_Palanka',
    'Sombor',
    'Sremska_Mitrovica',
    'Valjevo',
    'Veliko_Gradiste',
    'Vranje',
    'Vrsac',
    'Zejecar',
    'Zlatibor',
    'Zrenjanin'
  ];

  const [selectedCity, setSelectedCity] = useState('Beograd-Surcin');

  const [startDate, setStartDate] = useState(new Date());

  const [apiUrl, setApiUrl] = useState(`http://localhost:3000/weather/${selectedCity}/${new Date().toISOString().slice(0, 10)}`);

  const handleChange = date => {
    setStartDate(date);
  };

  useEffect(() => {
    const date = moment(startDate, 'DD.MM.YYYY').format('YYYY-MM-DD');
    const url = `http://localhost:3000/weather/${selectedCity}/${date}`;
    setApiUrl(url);
  }, [selectedCity, startDate]);

  return (
    <div>
      <Form className='dataInput'>
        <Form.Select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </Form.Select>
        <DatePicker
          selected={startDate}
          onChange={handleChange}
          dateFormat="dd.MM.yyyy"
          customInput={<Form.Control />}
        />
      </Form>
      <WeatherChart apiUrl={apiUrl} />
    </div>
  );
}
