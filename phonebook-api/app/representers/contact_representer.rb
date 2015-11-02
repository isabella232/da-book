class ContactRepresenter < Napa::Representer
  property :id, type: String
  property :name, type: String
  property :phone, type: String
  property :email, type: String
end
