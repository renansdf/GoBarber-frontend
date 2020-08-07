import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div``;

export const Header = styled.header`
  width: 100%;
  background-color: #28262e;
  display: flex;
  align-items:center;
  justify-content: center;
  padding: 32px 0;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1120px;
  width: 90%;

  > img{
    height: 80px;
  }

  > button{
    background: none;
    border: none;
    margin-left: auto;

    svg {
      color: #f4ede8;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;
  line-height: 24px;

  > img{
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div{
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  span{
    color: #f4ede8;

  }

  a {
    text-decoration: none;
    color: #ff9000;
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  display: flex;
  width: 90%;
  margin: 120px auto;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1{
    font-size: 36px;
  }

  p{
    color: #ff9000;
    margin-top: 8px;
    display: flex;
  }

  span{
    display:flex;
    align-items: center;
  }

  span + span::before{
    content: '';
    width: 1px;
    height: 12px;
    background: #ff9000;
    margin: 0 8px;
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong{
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div{
    display: flex;
    background-color: #3e3b47;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before{
      position: absolute;
      width: 1px;
      height: 80%;
      background: #ff9000;
      left: 0;
      top: 10%;
      content: '';
    }

    img{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong{
      margin-left: 24px;
      color: #fff;
    }

    span{
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg{
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Section = styled.div`
  margin-top: 48px;

  > strong{
    display: block;
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p{
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div{
    margin-top: 30px;
  }

  span{
    color: #f4ede8;
    width: 70px;

    svg{
      color: #ff9000;
      margin-right: 4px;
    }
  }

  div{
    flex: 1;
    display: flex;
    background-color: #3e3b47;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    position: relative;
    margin-left: 24px;
  }

  img{
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  strong{
    margin-left: 24px;
    color: #fff;
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

