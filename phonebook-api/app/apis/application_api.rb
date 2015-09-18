class ApplicationApi < Grape::API
  format :json
  extend Napa::GrapeExtenders

  mount HelloApi => '/'
  mount ContactsApi => '/contacts'

  add_swagger_documentation
end

