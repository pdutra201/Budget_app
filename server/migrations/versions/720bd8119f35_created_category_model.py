"""created category model

Revision ID: 720bd8119f35
Revises: b47f9f2ff946
Create Date: 2024-01-24 10:40:40.662676

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '720bd8119f35'
down_revision = 'b47f9f2ff946'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_categories'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('categories')
    # ### end Alembic commands ###
