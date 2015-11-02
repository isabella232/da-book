class ContactsApi < Grape::API
  desc 'Get a list of contacts'
  params do
    optional :ids, type: Array, desc: 'Array of contact ids'
  end
  get do
    contacts = params[:ids] ? Contact.where(id: params[:ids]) : Contact.all
    represent contacts, with: ContactRepresenter
  end

  desc 'Create an contact'
  params do
  end

  post do
    contact = Contact.create!(params[:contact])
    represent contact, with: ContactRepresenter
  end

  params do
    requires :id, desc: 'ID of the contact'
  end
  route_param :id do
    desc 'Get an contact'
    get do
      contact = Contact.find(params[:id])
      represent contact, with: ContactRepresenter
    end

    desc 'Update an contact'
    params do
    end
    put do
      # fetch contact record and update attributes.  exceptions caught in app.rb
      contact = Contact.find(params[:id])
      contact.update_attributes!(params[:contact])
      represent contact, with: ContactRepresenter
    end
  end

  desc 'Delete a contact'
  params do
    requires :id, type: String, desc: 'Contact ID.'
  end
  delete ':id' do
    Contact.find(params[:id]).destroy
  end
end
