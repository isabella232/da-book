require 'spec_helper'

describe Contact do
  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:phone) }
  end

  it 'can be created' do
    contact = create :contact
    expect(contact).to_not be_nil
  end
end
