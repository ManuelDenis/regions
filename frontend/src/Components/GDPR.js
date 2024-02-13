import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const GDPR = () => {
  return (
    <Container>
      <Row className='text-secondary justify-content-md-center lead pb-5'>
        <Col lg={6}>
          <h4 className='pb-5 pt-5'>Politica de Confidențialitate</h4>
            Bine ați venit pe <strong>vreauteren.ro</strong>. Înțelegem că confidențialitatea dvs. este importantă și luăm în serios protejarea datelor dvs. cu caracter personal. Prin intermediul acestei politici de confidențialitate, dorim să vă informăm despre modul în care prelucrăm datele dvs. cu caracter personal, în special în ceea ce privește numărul dvs. de telefon și informațiile specifice terenurilor pe care le colectăm și le afișăm pe site.
          <h5 className='pt-5'>
            1. Datele cu Caracter Personal Colectate
          </h5>
            Pe vreauteren.ro, colectăm numai informațiile necesare pentru furnizarea și îmbunătățirea serviciilor noastre. Prin intermediul site-ului, preluăm următoarele categorii de date cu caracter personal:
            Numărul de telefon: Acesta este colectat în scopul de a lua legătura cu proprietarii terenurilor. Nu vom face public numărul dvs. de telefon și îl vom utiliza doar intern în scopuri de promovare.
            Informații despre terenuri: Aria, prețul pe metru pătrat, locația pe hartă, deschiderea și tipul terenului. Aceste informații nu conțin date personale și vor fi vizibile altor utilizatori ai site-ului.
          <h5 className='pt-5'>
            2. Scopul Prelucrării Datelor
          </h5>
            Numărul dvs. de telefon va fi utilizat pentru a lua legătura cu dvs. în legătură cu terenurile listate pe site și va fi folosit intern în scopuri de promovare a serviciilor noastre.
            Informațiile despre terenuri sunt afișate public pe site și pot fi vizualizate de alți utilizatori în scopul facilitării tranzacțiilor imobiliare. Aceste informații nu includ date personale și sunt destinate să ofere informații utile privind proprietățile.
          <h5 className='pt-5'>
            3. Securitatea Datelor
          </h5>
            Ne angajăm să protejăm securitatea datelor dvs. cu caracter personal și luăm măsuri adecvate pentru a preveni accesul neautorizat, divulgarea sau modificarea acestora. Folosim practici de securitate standard pentru a proteja datele dvs.
          <h5 className='pt-5'>
            4. Drepturile Utilizatorilor
          </h5>
            Conform legislației GDPR, aveți dreptul de a solicita accesul la datele dvs. cu caracter personal, rectificarea acestora sau ștergerea lor. Pentru orice solicitare privind datele dvs., vă rugăm să ne contactați la adresa de e-mail [adresa_de_contact@vreauteren.ro].
          <h5 className='pt-5'>
            5. Modificări ale Politicii de Confidențialitate
          </h5>
            Ne rezervăm dreptul de a actualiza sau modifica periodic această politică de confidențialitate. Orice modificări vor fi publicate pe această pagină, iar utilizarea continuă a site-ului după aceste modificări constituie acceptarea lor.<br />
            Vă rugăm să citiți această politică cu atenție și să reveniți la ea periodic pentru a fi la curent cu orice modificări. Dacă aveți întrebări sau preocupări cu privire la modul în care procesăm datele dvs. cu caracter personal, vă rugăm să ne contactați.

        </Col>
        <Col lg={2}></Col>
      </Row>
    </Container>
  );
};

export default GDPR;
