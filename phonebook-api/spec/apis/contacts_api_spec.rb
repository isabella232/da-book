require 'spec_helper'

def app
  ApplicationApi
end

describe ContactsApi do
  include Rack::Test::Methods

  describe 'GET /contacts' do
    it 'lists all the contacts' do
      create :contact, name: 'Mike', email: 'mike@example.com', phone: '7789855529'
      create :contact, name: 'Bob Junior', email: 'bobjr@example.com', phone: '5551037'
      create :contact, name: 'Jimmy', email: 'jimmy@example.com', phone: '550800889123'

      get '/contacts'
      expect(response_body).to eq({
        data: [
          {'object_type'=>'contact', 'id'=>'1', 'name'=>'Mike', 'phone'=>'7789855529', 'email'=>'mike@example.com'},
          {'object_type'=>'contact', 'id'=>'2', 'name'=>'Bob Junior', 'phone'=>'5551037', 'email'=>'bobjr@example.com'},
          {'object_type'=>'contact', 'id'=>'3', 'name'=>'Jimmy', 'phone'=>'550800889123', 'email'=>'jimmy@example.com'}]
      }.to_json)
    end
  end

  describe 'POST /contacts' do
    context 'when the values are valid' do
      let(:last_user_id) { Contact.last.id.to_s }

      it 'responds with the new record' do
        post '/contacts', contact: { name: 'James', phone: '111111111', email: 'jones@example.com' }
        expect(response_body).to eq(
          {'data' => {
            'object_type'=>'contact',
            'id' => last_user_id,
            'name'=>'James',
            'phone'=>'111111111',
            'email'=>'jones@example.com'
          }}.to_json
        )
      end

      it 'creates a new contact' do
        expect do
          post '/contacts', contact: { name: 'James', phone: '111111111', email: 'jones@example.com' }
        end.to change(Contact, :count).by(1)
      end
    end

    context 'when the values are invalid' do
      it 'renders an error message' do
        post '/contacts', contact: { name: nil, phone: nil, email: nil}
        expect(response_body).to eq(
          {'error'=>
           {'code'=>'unprocessable_entity',
            'message'=>"Validation failed: Name can't be blank, Email can't be blank, Phone can't be blank",
            'reasons'=>{'name'=>["can't be blank"], 'email'=>["can't be blank"], 'phone'=>["can't be blank"]}}}.to_json)
      end
    end
  end

  describe 'DELETE /contacts/:id' do
    it 'deletes the contact' do
      contact = create :contact
      expect do
        delete "/contacts/#{contact.id}"
      end.to change(Contact, :count).by(-1)
    end
  end

  describe 'PUT /contacts/:id' do
    it 'updates the contact' do
      contact = create :contact
      put "/contacts/#{contact.id}", contact: { email: 'new@example.com' }
      contact.reload
      expect(contact.email).to eq 'new@example.com'
    end
  end

  describe 'GET /contacts/:id' do
    it 'shows the contact' do
      contact = create :contact
      get "/contacts/#{contact.id}"

      expect(response_body).to eq({
        "data"=>{
          "object_type"=>"contact",
          "id"=>contact.id.to_s,
          "name"=>"Luke",
          "phone"=>"4399897019",
          "email"=>"luke123@example.com"}
      }.to_json)
    end
  end
end
